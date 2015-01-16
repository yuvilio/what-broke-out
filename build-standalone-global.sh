#!/usr/bin/env sh
./node_modules/.bin/browserify-standalone
mkdir -p dist/build
mv what-broke-out.js dist/build/what-broke-out.js
