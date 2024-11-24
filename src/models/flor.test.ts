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

describe('#totalScorePoints', () => {
  let flor = new Flor([1, 0]);

  beforeEach(() => (flor = new Flor([1, 0])));

  it('Should return 4 when flower is accepted', () => {
    flor.chant(FlorLevel.Flor);

    flor.accepted = true;

    expect(flor.totalScorePoints()).toBe(4);
  });

  it('Should return 4 when contraflor is declined', () => {
    flor.chant(FlorLevel.ContraFlor);

    flor.accepted = false;

    expect(flor.totalScorePoints()).toBe(4);
  });
});

describe('#winner', () => {
  let flower = new Flor([1, 0]);

  const maxFlowerScoreCards = [
    CardFactory.from('7E'),
    CardFactory.from('6E'),
    CardFactory.from('5E'),
  ];
  const lowestFlowerScoreCards = [
    CardFactory.from('12O'),
    CardFactory.from('11O'),
    CardFactory.from('3O'),
  ];
  const maxFlowerScoreCardsOtherSuit = [
    CardFactory.from('7B'),
    CardFactory.from('6B'),
    CardFactory.from('5B'),
  ];

  beforeEach(() => (flower = new Flor([1, 0])));

  it('Should return 1 when player one has a higher flower score', () => {
    flower.playCards(0, maxFlowerScoreCards);
    flower.playCards(1, lowestFlowerScoreCards);

    expect(flower.winner()).toBe(0);
  });

  it('Should return the first player in the hand player order when 4 players have the same flower score', () => {
    flower = new Flor([2, 3, 0, 1]); // Player 2 is hand
    const flowerScoreCardsP1 = [
      CardFactory.from('12O'),
      CardFactory.from('11O'),
      CardFactory.from('10O'),
    ];
    const flowerScoreCardsP2 = [
      CardFactory.from('12B'),
      CardFactory.from('11B'),
      CardFactory.from('10B'),
    ];
    const flowerScoreCardsP3 = [
      CardFactory.from('12C'),
      CardFactory.from('11C'),
      CardFactory.from('10C'),
    ];
    const flowerScoreCardsP4 = [
      CardFactory.from('12E'),
      CardFactory.from('11E'),
      CardFactory.from('10E'),
    ];

    flower.playCards(0, flowerScoreCardsP1);
    flower.playCards(1, flowerScoreCardsP2);
    flower.playCards(2, flowerScoreCardsP3);
    flower.playCards(3, flowerScoreCardsP4);

    expect(flower.winner()).toBe(2);
  });
});
