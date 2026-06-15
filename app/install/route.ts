// Scout-specific binary install endpoint. mcpscan does not have verified release assets yet.
const script = `#!/usr/bin/env sh
set -eu

repo="Orisan-org/orisan-scout"
release="v0.2.0-alpha.2"
api="https://api.github.com/repos/$repo/releases/tags/$release"

os="$(uname -s | tr '[:upper:]' '[:lower:]')"
arch="$(uname -m)"

case "$os" in
  darwin) goos="darwin" ;;
  linux) goos="linux" ;;
  *) echo "Unsupported OS: $os" >&2; exit 1 ;;
esac

case "$arch" in
  arm64|aarch64) goarch="arm64" ;;
  x86_64|amd64) goarch="amd64" ;;
  *) echo "Unsupported architecture: $arch" >&2; exit 1 ;;
esac

asset="orisan-scout_\${goos}_\${goarch}.tar.gz"
tmp="$(mktemp -d)"
cleanup() { rm -rf "$tmp"; }
trap cleanup EXIT

url="$(curl -fsSL "$api" | sed -n 's/.*"browser_download_url": *"\\([^"]*'"$asset"'\\)".*/\\1/p' | head -n 1)"
if [ -z "$url" ]; then
  echo "Could not find release asset: $asset" >&2
  exit 1
fi

curl -fsSL "$url" -o "$tmp/$asset"
tar -xzf "$tmp/$asset" -C "$tmp"

bin_dir="\${ORISAN_INSTALL_DIR:-/usr/local/bin}"
if [ ! -w "$bin_dir" ]; then
  bin_dir="$HOME/.local/bin"
  mkdir -p "$bin_dir"
fi

mv "$tmp/orisan" "$bin_dir/orisan"
chmod +x "$bin_dir/orisan"

echo "Orisan installed: $bin_dir/orisan"
echo "Run: orisan scout"
case ":$PATH:" in
  *":$bin_dir:"*) ;;
  *) echo "Note: add $bin_dir to PATH if 'orisan' is not found." ;;
esac
`;

export function GET() {
  return new Response(script, {
    headers: {
      "Content-Type": "text/x-shellscript; charset=utf-8",
      "Cache-Control": "public, max-age=300"
    }
  });
}
