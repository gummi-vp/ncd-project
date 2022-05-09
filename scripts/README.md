## Environment

The scripts in this folder are designed to help you demonstrate the behavior of the contract(s) in this project.

```sh
  export CONTRACT=        # depends on deployment
  export OWNER=           # any account you control

  # For example
  # export CONTRACT=dev-1615190770786-2702449
  # export OWNER=gummi.testnet
```

## Commands

  _helper scripts_

  ```sh
  1.dev-deploy.sh                  # helper: build and deploy contracts
  2.play-game.sh                   # helper: call the playGame function, to start the game
  3.get-card.sh                    # helper: call the getCard function, to get a new card
  4.stand-card.sh                  # helper: call the standCard function, to continue the game with the cards in your hand
  5.get-streak.sh <account-id>     # helper: call the getWinStreak function, to see the highest score by account ID
  ```