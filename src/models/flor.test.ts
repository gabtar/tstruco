import { CardFactory } from '../factories/card.factory';
import { FlorLevel } from '../types';
import { Flor } from './flor';

describe('#chant', () => {
  let flor = new Flor([1, 0]);

  beforeEach(() => (flor = new Flor([1, 0])));

  it('Should add the new flor level', () => {
    flor.chant(FlorLevel.Flor);

    expect(flor.chanted).toBe(FlorLevel.Flor);
  });

  it('Should add the new flor level when its a higher level', () => {
    flor.chant(FlorLevel.Flor);

    flor.chant(FlorLevel.ContraFlorAlResto);

    expect(flor.chanted).toBe(FlorLevel.ContraFlorAlResto);
  });

  it('Should raise error when the chant is invalid', () => {
    flor.chant(FlorLevel.Flor);

    expect(() => flor.chant(FlorLevel.Flor)).toThrow('Invalid chant');
  });
});

describe('#playCards', () => {
  let flor = new Flor([1, 0]);
  const cards = [
    CardFactory.from('1E'),
    CardFactory.from('7E'),
    CardFactory.from('4E'),
  ];

  beforeEach(() => (flor = new Flor([1, 0])));

  it('Should add the cards played', () => {
    flor.chant(FlorLevel.Flor);

    flor.playCards(0, cards);

    const expectedCards = flor.cardsPlayed.get(0);

    expect(expectedCards).toHaveLength(3);
    expect(expectedCards).toContain(cards[0]);
    expect(expectedCards).toContain(cards[1]);
    expect(expectedCards).toContain(cards[2]);
  });

  it('Should raise error when no 3 cards passed', () => {
    flor.chant(FlorLevel.Flor);

    expect(() => flor.playCards(0, [cards[0], cards[1]])).toThrow(
      'Invalid cards',
    );
  });
});
