import { Truco } from './models/truco';

export { Truco } from './models/truco';

const truco = new Truco();

const rules = {
  numberOfPlayers: 6,
  flor: true,
  maxPoints: 30,
};

const newGameRequest = {
  rules: rules,
};

truco.action('newGame', newGameRequest);
truco.action('newHand', {});

console.log(truco.getState().hand.handPlayer);
console.log(truco.getState().hand.players[0].cards);
console.log(truco.getState().hand.handPlayer);

const handPlayer = truco.getState().hand.handPlayer;
const handPlayerCards = truco.getState().hand.players[handPlayer].cards;

truco.action('playCard', {
  player: handPlayer,
  card: handPlayerCards[0].toString(),
});

// TODO: should remove the card from the player
console.log(truco.getState().hand.players[0].cards);
console.log(truco.getState().hand.rounds[0].cardsPlayed);
