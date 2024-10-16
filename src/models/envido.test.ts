import { EnvidoLevel } from '../types';
import { Card } from './card';
import { Envido } from './envido';

describe('chant', () => {
  const envido = new Envido();

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

    envido.playCards(0, [card1, card2]);

    expect(envido.cardsPlayed.has(0)).toBeTruthy();
  });

});
