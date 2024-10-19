import { EnvidoPairFactory } from '../factories/envido-pair.factory';
import { EnvidoLevel } from '../types';
import { Card } from './card';
import { Envido } from './envido';

describe('chant', () => {
  const envido = new Envido([]);

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

  it('Should add the cards played for the player passed', () => {
    const card1 = new Card('1', 'O');
    const card2 = new Card('6', 'O');
    const envidoPair = EnvidoPairFactory.createEnvidoPair(card1, card2);

    envido.playCards(0, envidoPair);

    expect(envido.cardsPlayed.has(0)).toBeTruthy();
  });

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

    expect(envido.winner()).toEqual([0]);
  });

  it('Should return both winners when they have an EnvidoPair of equal score', () => {
    const card1 = new Card('7', 'O');
    const card2 = new Card('6', 'O');
    const envidoPairOne = EnvidoPairFactory.createEnvidoPair(card1, card2);

    const card3 = new Card('7', 'E');
    const card4 = new Card('6', 'E');
    const envidoPairTwo = EnvidoPairFactory.createEnvidoPair(card3, card4);

    envido.playCards(0, envidoPairOne);
    envido.playCards(1, envidoPairTwo);

    expect(envido.winner()).toEqual([0, 1]);
  });
});
