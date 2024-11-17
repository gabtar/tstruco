import { Truco } from './models/truco';

export { Truco } from './models/truco';

// pass to next player
function nextPlayer(playerNumber: number) {
  return playerNumber >= 3 ? 0 : playerNumber + 1;
}

// Integration test / sample game

const truco = new Truco();

const rules = {
  numberOfPlayers: 2,
  maxPoints: 15,
  flor: false,
};

// Create the new game
truco.action('newGame', { rules: rules });
truco.action('newHand', {});

let handPlayer = truco.getState().hand.turns.playCardTurn!;
const players = truco.getState().hand.players;
let currentPlayer = handPlayer?.id;

// Play a Card
truco.action('playCard', {
  player: currentPlayer!,
  cardCode: handPlayer!.cards[0].toString(),
});

// Chant envido
currentPlayer = nextPlayer(currentPlayer!);

truco.action('chantEnvido', { player: currentPlayer, chant: 2 });
truco.action('respondEnvido', { player: players[0].id, accepted: false });

// Print envido scores
console.log('TEAM A Score', truco.getState().score.getScore(0));
console.log('TEAM B Score', truco.getState().score.getScore(1)); // won the envido(not accepted) should be 1 points

// end round
truco.action('playCard', {
  player: currentPlayer!,
  cardCode: players[currentPlayer].cards[0].toString(),
});

console.log(truco.getState());
