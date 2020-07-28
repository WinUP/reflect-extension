set -e
rm -rf ./dist
tsc --project ./tsconfig.json --module CommonJS --outDir ./dist/cjs
tsc --project ./tsconfig.json --module ES2015 --outDir ./dist/esm