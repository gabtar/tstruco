import { Deck } from './deck';

describe('Deal Cards', () => {
  test('Should return 6 random cards for 2 players', () => {
    const deck = new Deck();
    const cards = deck.dealCards(2);

    expect(cards.length).toEqual(6);
  });
});
