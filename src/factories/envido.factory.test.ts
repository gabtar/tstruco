import { EnvidoLevel } from '../types';
import { CardFactory } from './card.factory';
import { EnvidoPairFactory } from './envido-pair.factory';
import { EnvidoFactory } from './envido.factory';

describe('#from', () => {
  it('Should return an envido with 4 chants when EERF is passed', () => {
    const envidoCode = 'EERF';

    const envido = EnvidoFactory.from(envidoCode, 2, 4);

    const expectedLevels = [
      EnvidoLevel.Envido,
      EnvidoLevel.Envido,
      EnvidoLevel.RealEnvido,
      EnvidoLevel.FaltaEnvido,
    ];

    expect(expectedLevels).toStrictEqual(envido.chanted);
  });

  it('Should return an accepted envido and 1E7E should be played by player 0', () => {
    const envidoCode = 'EA-01E7E-N';

    const envido = EnvidoFactory.from(envidoCode, 2, 4);
    const expectedEnvidoPairPlayed = EnvidoPairFactory.createEnvidoPair(
      CardFactory.from('1E'),
      CardFactory.from('7E'),
    );

    expect(envido.accepted).toBeTruthy();
    expect(envido.cardsPlayed.get(0)).toStrictEqual(expectedEnvidoPairPlayed);
  });
});
