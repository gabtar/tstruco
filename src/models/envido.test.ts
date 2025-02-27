import { CardFactory } from '../factories/card.factory';
import { EnvidoPairFactory } from '../factories/envido-pair.factory';
import { EnvidoLevel } from '../types';
import { Card } from './card';
import { Envido } from './envido';
import { EnvidoPair } from './envido-pair';

describe('#chant', () => {
  const envido = new Envido([1, 0]);

  it('Should add envido to the chanted array', () => {
    const envidoLevel = EnvidoLevel.Envido;
    envido.addChant(envidoLevel);

    expect(envido.chanted).toHaveLength(1);
    expect(envido.chanted[0]).toBe(envidoLevel);
  });

  it('Should raise error if chanted level is lower than current level', () => {
    envido.addChant(EnvidoLevel.FaltaEnvido);

    expect(() => envido.addChant(EnvidoLevel.Envido)).toThrow(
      'Cannot chant Envido!',
    );
  });
});

describe('#playCards', () => {
  const envido = new Envido([1, 0]);

  it('Should add the cards played for the player passed', () => {
    const card1 = new Card('1', 'O');
    const card2 = new Card('6', 'O');
    const envidoPair = EnvidoPairFactory.createEnvidoPair(card1, card2);

    envido.playCards(0, envidoPair);

    expect(envido.cardsPlayed.has(0)).toBeTruthy();
  });
});

describe('#winner', () => {
  const envido = new Envido([1, 0]);

  it('Should return the winner of the envido', () => {
    const card1 = new Card('1', 'O');
    const card2 = new Card('6', 'O');
    // highest envido pair
    const higestEnvidoPair = EnvidoPairFactory.createEnvidoPair(card1, card2);

    const card3 = new Card('1', 'E');
    const card4 = new Card('2', 'E');
    const lowerEnvidoPair = EnvidoPairFactory.createEnvidoPair(card3, card4);

    envido.playCards(0, higestEnvidoPair);
    envido.playCards(1, lowerEnvidoPair);

    expect(envido.winner()).toEqual(0);
  });

  it('Should return the first player who is next to the hand player when both players tie the envido score', () => {
    const card1 = new Card('7', 'O');
    const card2 = new Card('6', 'O');
    const envidoPairOne = EnvidoPairFactory.createEnvidoPair(card1, card2);

    const card3 = new Card('7', 'E');
    const card4 = new Card('6', 'E');
    const envidoPairTwo = EnvidoPairFactory.createEnvidoPair(card3, card4);

    envido.playCards(0, envidoPairOne);
    envido.playCards(1, envidoPairTwo);

    expect(envido.winner()).toEqual(1);
  });
});

describe('#totalScorePoints', () => {
  const envido = new Envido([1, 0]);

  it('Should return 2 when only envido has been chanted and accepted', () => {
    envido.chanted = [EnvidoLevel.Envido];
    envido.accepted = true;

    expect(envido.totalScorePoints()).toBe(2);
  });

  it('Should return 1 when only envido has been chanted and has been declined', () => {
    envido.chanted = [EnvidoLevel.Envido];
    envido.accepted = false;

    expect(envido.totalScorePoints()).toBe(1);
  });

  it('Should return 3 when envido and real envido have been chanted, but declined', () => {
    envido.chanted = [EnvidoLevel.Envido, EnvidoLevel.RealEnvido];
    envido.accepted = false;

    expect(envido.totalScorePoints()).toBe(3);
  });

  it('Should return 5 when envido and real envido have been chanted and accepted', () => {
    envido.chanted = [EnvidoLevel.Envido, EnvidoLevel.RealEnvido];
    envido.accepted = true;

    expect(envido.totalScorePoints()).toBe(5);
  });
});

describe('#serialize', () => {
  const envido = new Envido([1, 0]);

  it('Should return a nothing when no envido was chanted', () => {
    expect(envido.serialize()).toBe('N');
  });

  it('Should return an EERD-N when envido, envido, real envido was chanted and declined', () => {
    envido.addChant(EnvidoLevel.Envido);
    envido.addChant(EnvidoLevel.Envido);
    envido.addChant(EnvidoLevel.RealEnvido);
    envido.accepted = false;

    expect(envido.serialize()).toBe('EERD-N');
  });

  it('Should return an EEA-07E6E-N when envido, envido, was chanted, accepted and player 0 played 7E and 6E', () => {
    envido.chanted = [];

    envido.addChant(EnvidoLevel.Envido);
    envido.addChant(EnvidoLevel.Envido);
    envido.accepted = true;
    envido.playCards(
      0,
      new EnvidoPair(CardFactory.from('7E'), CardFactory.from('6E')),
    );

    expect(envido.serialize()).toBe('EEA-07E6E-N');
  });
});
