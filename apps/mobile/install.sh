#!/bin/bash
# Install mobile app dependencies using npm (outside bun workspace)
# This is necessary because bun's .bun/ cache layout is incompatible with Metro/Expo.
# Usage: cd apps/mobile && ./install.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MONOREPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
TMP_DIR=$(mktemp -d)

echo "Installing mobile dependencies via npm..."
cp "$SCRIPT_DIR/package.json" "$TMP_DIR/package.json"
(cd "$TMP_DIR" && npm install --no-audit --no-fund 2>&1)

echo "Moving node_modules..."
rm -rf "$SCRIPT_DIR/node_modules"
mv "$TMP_DIR/node_modules" "$SCRIPT_DIR/node_modules"

echo "Linking workspace packages..."
mkdir -p "$SCRIPT_DIR/node_modules/@websuite"
ln -sf "$MONOREPO_ROOT/packages/backend" "$SCRIPT_DIR/node_modules/@websuite/backend"
ln -sf "$MONOREPO_ROOT/packages/typescript-config" "$SCRIPT_DIR/node_modules/@websuite/typescript-config"

rm -rf "$TMP_DIR"
echo "Done!"
