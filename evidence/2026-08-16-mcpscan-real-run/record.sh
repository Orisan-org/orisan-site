#!/bin/zsh
# The exact session captured in run.cast. Steps 1 and 2 do not touch the uv cache,
# so the cache is still cold when the timed run in step 3 executes.
export PATH="$HOME/.local/bin:$PATH"
EV="$HOME/Orisan/orisan-site/evidence/2026-08-16-mcpscan-real-run"
export UV_CACHE_DIR="$EV/.uvcache-cold"
cd "$EV"
echo "# 1. what PyPI publishes for orisan-mcpscan 0.1.1"
curl -s https://pypi.org/pypi/orisan-mcpscan/0.1.1/json \
  | python3 -c 'import sys,json;[print(u["filename"], u["digests"]["sha256"], u["upload_time_iso_8601"]) for u in json.load(sys.stdin)["urls"]]'
echo
echo "# 2. sha256 of the bytes PyPI actually serves for that wheel"
URL=$(curl -s https://pypi.org/pypi/orisan-mcpscan/0.1.1/json \
  | python3 -c 'import sys,json;print([u["url"] for u in json.load(sys.stdin)["urls"] if u["filename"].endswith(".whl")][0])')
curl -sL "$URL" | shasum -a 256
echo
echo "# 3. the run - cold uv cache, headline one-liner, timed"
/usr/bin/time -p uvx orisan-mcpscan scan-config ./mcp.json --yes
echo "exit: $?"
echo
echo "# 4. version uvx resolved, from the environment step 3 built"
uvx orisan-mcpscan --version
