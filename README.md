# Draco Card Game

This project is a card game similar to blackjack, played against the computer (dealer). At the start of the game, you have two cards with a random number from 1 to 11. We can see one card in the dealer's hand. We can ask for a new card as the next move or continue with the two cards we have. Then, if the sum of our cards is less than 23 and is greater than the sum of the three cards in the dealer's hand, we win the game.

## Cloning The Project
```
git clone https://github.com/gummi-vp/near-draco-card-game.git
```
After cloning the project
```
yarn
```

## Building and Deploying The Contract
```
yarn build:release
near dev-deploy ./build/release/simple.wasm
export CONTRACT=<accountId>
near login
```
accountId --> Which is generated after the contract deployment

## Functions

### playGame
Player calls the playGame function to start the game.

```
near call <contract-id> playGame --account_id <account-id>
```

### getCard
If player wants to get a new card, player calls the getCard function.

```
near call <contract-id> getCard --account_id <account-id>
```

### standCard
If player wants to continue with the cards in his hand, player calls the standCard function.

```
near call <contract-id> standCard --account_id <account-id>
```

### getWinStreak
- Takes ***playerName*** as a parameter
- Returns the player's highest winning streak in the game

```
near call <contract-id> getWinStreak '{"playerName": "<playerName>"}' --account_id <account-id>
```
playerName --> Sender's account ID

## Loom Video

https://www.loom.com/share/835b14c70091458bbd148935ff2a8d08