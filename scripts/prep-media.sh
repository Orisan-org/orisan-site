#!/usr/bin/env bash
# prep-media.sh — Orisan site media pipeline
#
# Takes raw video/image exports from Higgsfield or Gemini and produces everything
# the site needs: web-ready video in two formats, poster stills, and a manifest.
#
#   ./scripts/prep-media.sh ~/Downloads/orisan-raw
#
# Outputs into public/media/ and writes public/media/media-manifest.json.
# Re-runnable: skips files whose outputs already exist unless you pass --force.
#
# Requires ffmpeg.  macOS:  brew install ffmpeg

set -euo pipefail

IN="${1:-}"
FORCE="${2:-}"
OUT="public/media"

# Budgets from CLAUDE.md, in bytes.
HERO_BUDGET=$((2 * 1024 * 1024))     # 2 MB
CLIP_BUDGET=$((800 * 1024))          # 800 KB

if [[ -z "$IN" || ! -d "$IN" ]]; then
  echo "usage: ./scripts/prep-media.sh <folder-of-raw-exports> [--force]"
  echo "  name your hero file with 'hero' in it so the larger budget applies."
  exit 2
fi
command -v ffmpeg >/dev/null || { echo "ffmpeg not found.  macOS: brew install ffmpeg"; exit 1; }

mkdir -p "$OUT"
TMP_MANIFEST="$(mktemp)"
echo "[" > "$TMP_MANIFEST"
FIRST=1
FAILED=0

human() { awk -v b="$1" 'BEGIN{ if (b<1024) printf "%dB", b; else if (b<1048576) printf "%.0fKB", b/1024; else printf "%.2fMB", b/1048576 }'; }
slugify() { echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' _.' '---' | tr -cd 'a-z0-9-' | sed -E 's/-+/-/g; s/^-|-$//g'; }

# ---------------------------------------------------------------- video ----
shopt -s nullglob nocaseglob
for f in "$IN"/*.{mp4,mov,webm,m4v}; do
  slug="$(slugify "$(basename "${f%.*}")")"

  if [[ "$slug" == *hero* ]]; then budget=$HERO_BUDGET; label="hero"; else budget=$CLIP_BUDGET; label="clip"; fi

  if [[ -f "$OUT/$slug.webm" && "$FORCE" != "--force" ]]; then
    echo "skip   $slug (exists, use --force to redo)"
  else
    echo "encode $slug"
    # Quality ladder. Start high, step down only as far as the budget forces.
    # This is why you do not have to think about crf values: the script does.
    for pair in "34 26" "38 30" "42 34"; do
      vp9crf="${pair% *}"; h264crf="${pair#* }"
      ffmpeg -y -loglevel error -i "$f" \
        -c:v libvpx-vp9 -crf "$vp9crf" -b:v 0 -row-mt 1 -an \
        -pix_fmt yuv420p "$OUT/$slug.webm"
      ffmpeg -y -loglevel error -i "$f" \
        -c:v libx264 -crf "$h264crf" -preset slow -an \
        -pix_fmt yuv420p -movflags +faststart "$OUT/$slug.mp4"

      _wb=$(wc -c < "$OUT/$slug.webm" | tr -d ' ')
      _mb=$(wc -c < "$OUT/$slug.mp4"  | tr -d ' ')
      _big=$(( _wb > _mb ? _wb : _mb ))
      if (( _big <= budget )); then break; fi
      echo "  $(human $_big) at crf $vp9crf, over the $(human $budget) $label budget, stepping down"
    done

    # Poster from the first frame. This is what shows before play, on reduced
    # motion, and if video is blocked. It is required, never optional.
    ffmpeg -y -loglevel error -i "$f" -vframes 1 -q:v 80 "$OUT/$slug.webp"
    ffmpeg -y -loglevel error -i "$f" -vframes 1 -q:v 3   "$OUT/$slug.jpg"
  fi

  w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width  -of csv=p=0 "$OUT/$slug.mp4")
  h=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$OUT/$slug.mp4")
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT/$slug.mp4" | cut -d. -f1)
  wb=$(wc -c < "$OUT/$slug.webm" | tr -d ' ')
  mb=$(wc -c < "$OUT/$slug.mp4"  | tr -d ' ')
  big=$(( wb > mb ? wb : mb ))

  if (( big > budget )); then
    echo "  STILL OVER BUDGET  $slug is $(human $big) at the lowest quality step."
    echo "                     The clip is too long or too busy. Shorten it to 4-6s,"
    echo "                     or simplify the motion. Do not ship it as is."
    FAILED=1
  else
    echo "  ok  webm $(human $wb)  mp4 $(human $mb)  ${w}x${h}  ${dur}s"
  fi

  [[ $FIRST -eq 0 ]] && echo "," >> "$TMP_MANIFEST"
  FIRST=0
  cat >> "$TMP_MANIFEST" <<EOF
  {
    "slug": "$slug",
    "webm": "/media/$slug.webm",
    "mp4": "/media/$slug.mp4",
    "poster": "/media/$slug.webp",
    "posterFallback": "/media/$slug.jpg",
    "width": $w,
    "height": $h,
    "durationSeconds": ${dur:-0},
    "bytesWebm": $wb,
    "bytesMp4": $mb,
    "alt": "TODO — describe what is drawn, not what it means. Written by a human."
  }
EOF
done

# ---------------------------------------------------------------- stills ----
for f in "$IN"/*.{png,jpg,jpeg,webp}; do
  slug="$(slugify "$(basename "${f%.*}")")"
  [[ -f "$OUT/$slug.webp" && "$FORCE" != "--force" ]] && { echo "skip   $slug (still exists)"; continue; }
  echo "still  $slug"
  # Cap at 2400px wide. Anything larger is wasted bytes on every device.
  ffmpeg -y -loglevel error -i "$f" -vf "scale='min(2400,iw)':-2" -q:v 80 "$OUT/$slug.webp"
  echo "  ok  $(human "$(wc -c < "$OUT/$slug.webp" | tr -d ' ')")"
done

echo "]" >> "$TMP_MANIFEST"
mv "$TMP_MANIFEST" "$OUT/media-manifest.json"

echo
echo "wrote $OUT/media-manifest.json"
echo
echo "NEXT, and do not skip this:"
echo "  1. Open media-manifest.json and replace every \"alt\" TODO with real alt text."
echo "     Describe the drawing, not the metaphor. It is a public-facing claim."
echo "  2. Only then tell Claude Code to do slice 4."
if (( FAILED )); then
  echo
  echo "One or more files are over budget. Fix those before handing over."
  exit 1
fi
