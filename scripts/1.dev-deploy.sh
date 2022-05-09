#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Building the contract (may take a few seconds)"
echo ---------------------------------------------------------
echo

yarn build:release

echo
echo
echo ---------------------------------------------------------
echo "Deploying the contract"
echo ---------------------------------------------------------
echo

near dev-deploy ./build/release/simple.wasm

echo
echo
echo ---------------------------------------------------------
echo "    Find the contract (account) name in the message above"
echo "    it will look like this: [ Account id: dev-###-### ]"
echo ---------------------------------------------------------
echo 
echo "Run the following commands"
echo
echo 'export CONTRACT=<dev-123-456>'
echo 'export OWNER=<account owner>'
echo ---------------------------------------------------------
echo

exit 0