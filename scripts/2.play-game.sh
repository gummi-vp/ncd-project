#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

echo
echo
echo ---------------------------------------------------------
echo "Calling playGame function on the contract"
echo ---------------------------------------------------------
echo

near call $CONTRACT playGame --account_id $OWNER