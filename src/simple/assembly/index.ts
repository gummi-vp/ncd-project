import { storage, Context, PersistentVector, PersistentMap, RNG, logging } from "near-sdk-as"

let playerCards = new PersistentVector<u32>("pcards");
let dealerCards = new PersistentVector<u32>("dcards");
let winStreak = new PersistentMap<string, u32>("wstr");

let player = Context.sender;

// playGame function to start the game
export function playGame(): string {
  assert(playerCards.isEmpty, "Please, call the getCard or standCard function.");

  playerCards.push(new RNG<u32>(1, 11).next() + 1);
  playerCards.push(new RNG<u32>(1, 11).next() + 1);
  dealerCards.push(new RNG<u32>(1, 11).next() + 1);

  return 'Your Cards: Card 1 --> ' + playerCards[0].toString() + ',  Card 2 --> ' + playerCards[1].toString()
    + ' // Dealer Card 1 --> ' + dealerCards[0].toString() + '. Do you want another card? (If you want, call getCard function. If not, call standCard function.)';
}

// if player wants one more card
export function getCard(): string {
  pushCards(true);

  let playerCard1 = playerCards[0];
  let playerCard2 = playerCards[1];
  let playerCard3 = playerCards[2];

  let dealerCard1 = dealerCards[0];
  let dealerCard2 = dealerCards[1];
  let dealerCard3 = dealerCards[2];

  let gameMessage = "";

  if (((playerCard1 + playerCard2 + playerCard3) > (dealerCard1 + dealerCard2 + dealerCard3) && (playerCard1 + playerCard2 + playerCard3) < 23)) {
    gameMessage = "Congratulations, You Won! Current Win Streak: " + writeStreak(true);
  }
  else if ((playerCard1 + playerCard2 + playerCard3) < (dealerCard1 + dealerCard2 + dealerCard3) && (dealerCard1 + dealerCard2 + dealerCard3) < 23) {
    gameMessage = "Dealer Won! Current Win Streak: " + writeStreak(false);
  }
  else if ((playerCard1 + playerCard2 + playerCard3) >= 23 && (dealerCard1 + dealerCard2 + dealerCard3) < 23) {
    gameMessage = "Dealer Won! Current Win Streak: " + writeStreak(false);
  }
  else if ((playerCard1 + playerCard2 + playerCard3) < 23 && (dealerCard1 + dealerCard2 + dealerCard3) >= 23) {
    gameMessage = "Congratulations, You Won! Current Win Streak: " + writeStreak(true);
  }
  else {
    gameMessage = "Draw!";
  }

  popCards(true);

  return gameMessage + ' // Your Cards: Card 1 --> ' + playerCard1.toString() + ',  Card 2 --> ' + playerCard2.toString()
    + ', Card 3 --> ' + playerCard3.toString() + ' // Dealer Cards: Card 1 --> ' + dealerCard1.toString() + ', Card 2 --> ' + dealerCard2.toString() + ', Card 3 --> ' + dealerCard3.toString();
}

// if player wants to stand
export function standCard(): string {
  pushCards(false);

  let playerCard1 = playerCards[0];
  let playerCard2 = playerCards[1];

  let dealerCard1 = dealerCards[0];
  let dealerCard2 = dealerCards[1];
  let dealerCard3 = dealerCards[2];

  let gameMessage = "";

  if (((playerCard1 + playerCard2) > (dealerCard1 + dealerCard2 + dealerCard3) && (playerCard1 + playerCard2) < 23)) {
    gameMessage = "Congratulations, You Won! Current Win Streak: " + writeStreak(true);
  }
  else if ((playerCard1 + playerCard2) < (dealerCard1 + dealerCard2 + dealerCard3) && (dealerCard1 + dealerCard2 + dealerCard3) < 23) {
    gameMessage = "Dealer Won! Current Win Streak: " + writeStreak(false);
  }
  else if ((playerCard1 + playerCard2) >= 23 && (dealerCard1 + dealerCard2 + dealerCard3) < 23) {
    gameMessage = "Dealer Won! Current Win Streak: " + writeStreak(false);
  }
  else if ((playerCard1 + playerCard2) < 23 && (dealerCard1 + dealerCard2 + dealerCard3) >= 23) {
    gameMessage = "Congratulations, You Won! Current Win Streak: " + writeStreak(true);
  }
  else {
    gameMessage = "Draw!";
  }

  popCards(false);

  return gameMessage + ' // Your Cards: Card 1 --> ' + playerCard1.toString() + ',  Card 2 --> ' + playerCard2.toString()
    + ' // Dealer Cards: Card 1 --> ' + dealerCard1.toString() + ', Card 2 --> ' + dealerCard2.toString() + ', Card 3 --> ' + dealerCard3.toString();
}

// push cards to persistentMap
function pushCards(key: bool): void {
  assert(!playerCards.isEmpty, "Please, call the playGame function first.");

  dealerCards.push(new RNG<u32>(1, 11).next() + 1);
  dealerCards.push(new RNG<u32>(1, 11).next() + 1);
  if (key) {
    // logging.log(playerCards.length);
    playerCards.push(new RNG<u32>(1, 11).next() + 1);
  }
}

// pop cards in persistentMap
function popCards(key: bool): void {
  playerCards.pop();
  playerCards.pop();
  if (key) {
    // logging.log(playerCards.length);
    playerCards.pop();
  }

  dealerCards.pop();
  dealerCards.pop();
  dealerCards.pop();
}

// Storing the highest scores in a persistentMap and Storage
function writeStreak(key: bool): string {
  if (winStreak.contains(player)) {
    let playerWins = winStreak.getSome(player);
    if (key) {
      playerWins++;
      winStreak.set(player, playerWins);
      if(read(player) < playerWins){
        write(player, playerWins);
      }
    }
    else {
      playerWins = 0;
      winStreak.set(player, 0);
    }
    return playerWins.toString() + " - Player: " + player;
  }
  else {
    if (key) {
      winStreak.set(player, 1);
      if(read(player) < 1){
        write(player, 1);
      }
      return "1" + " - Player: " + player;
    }
    else {
      winStreak.set(player, 0);
      return "0" + " - Player: " + player;
    }
  }
}

// Fetching Highest Winning Streak according to the player (sender)
export function getWinStreak(playerName: string): string {
  if (storage.hasKey(playerName)) {
    return playerName + " --> Highest Winning Streak is " + storage.getSome<u32>(playerName).toString();
  } else {
    return playerName + " --> Highest Winning Streak is 0";
  }
}

// read the given key from account (contract) storage
function read(key: string): u32 {
  if (storage.hasKey(key)) {
    return storage.getSome<u32>(key);
  } else {
    return 0;
  }
}

// write the given value at the given key to account (contract) storage
function write(key: string, value: u32): string {
  storage.set(key, value)
  return `✅ Data saved.`
}