#!/bin/bash
# Recorded at the width the tool actually renders at. Earlier attempts to pin a
# narrower width via COLUMNS were ignored here, so rather than fight the tool
# into a shape it does not produce, the recording is the shape it produces.
CMD='uvx orisan-mcpscan scan-config ./mcp.json --yes'
printf '\033[1m$\033[0m %s\n' "$CMD"
sleep 1.2
eval "$CMD"
sleep 2.5
