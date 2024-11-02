import { Truco } from './models/truco';

export { Truco } from './models/truco';


// pass to next player
function nextPlayer(playerNumber: number) {
  return playerNumber > 3 ? 0 : playerNumber + 1;
}

// Integration test / sample game

const truco = new Truco();

const rules = {
  numberOfPlayers: 4,
  maxPoints: 4,
  flor: false,
}

// Create the new game
truco.action('newGame', { rules: rules });
truco.action('newHand', {});

let handPlayer = truco.getState().hand.turns.handPlayer;
const players = truco.getState().hand.players;


let currentPlayer = handPlayer?.id;

console.log(handPlayer);
// Play a Card
// truco.action('playCard', { player: currentPlayer!, cardCode: handPlayer!.cards[0].toString() })

console.log(truco.getState());
