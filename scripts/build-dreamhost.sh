#!/usr/bin/env bash
set -euo pipefail

npm ci
npm run build
cp deploy/dreamhost.htaccess dist/.htaccess

echo "DreamHost upload artifact ready in ./dist"
