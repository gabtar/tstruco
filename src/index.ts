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

console.log(truco.getState().hand.turns.handPlayer);
console.log(truco.getState().hand.players[0].cards);
console.log(truco.getState().hand.turns.handPlayer);

const handPlayer = truco.getState().hand.turns.handPlayer;
const handPlayerCards = truco.getState().hand.players[handPlayer!.id].cards;

truco.action('playCard', {
  player: handPlayer!.id,
  cardCode: handPlayerCards[0].toString(),
});

// TODO: should remove the card from the player
console.log(truco.getState().hand.players[0].cards);
console.log(truco.getState().hand.rounds[0].cardsPlayed);
