#!/usr/bin/env bash
# Usage: scaffold.sh <target-dir> "<Deck title>"
# Copies the deck template (templates/deck, next to this script) into <target-dir>, which must not exist,
# and sets the title.
set -euo pipefail
dest=${1:?target dir}; title=${2:?deck title}
here=$(cd "$(dirname "$0")" && pwd)
src="$here/templates/deck"
[ -d "$src" ] || { echo "missing template: $src" >&2; exit 1; }
[ -e "$dest" ] && { echo "refusing: $dest exists" >&2; exit 1; }
cp -R "$src" "$dest"
rm -rf "$dest/tools/node_modules" "$dest/out"
python3 - "$dest/index.html" "$title" <<'PY'
import html, sys
p, t = sys.argv[1], html.escape(sys.argv[2])
s = open(p).read().replace('{{TITLE}}', t)
open(p, 'w').write(s)
PY
echo "Scaffolded $dest. Next: cd $dest/tools && npm install && npm run smoke"
