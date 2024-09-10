import { Deck } from './deck';

describe('Deal Cards', () => {
  test('Should return 6 random cards for 2 players', () => {
    let deck = new Deck();
    let cards = deck.dealCards(2);

    expect(cards.length).toEqual(6);
  });
});
