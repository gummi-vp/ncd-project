#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

echo
echo
echo ---------------------------------------------------------
echo "Calling getWinStreak function on the contract"
echo ---------------------------------------------------------
echo

near call $CONTRACT getWinStreak '{"playerName": "'"$1"'"}' --account_id $OWNER