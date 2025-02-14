import { EnvidoLevel } from '../types';
import { CardFactory } from './card.factory';
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

  it('Should return an envido instance with envido and real envido accepted and cards played by player 2 and 4C for player 3 when "ERA-27E6E-34C-N" is deserialized', () => {
    const envidoCode = 'ERA-27E6E-34C-N';

    const envido = EnvidoFactory.from(envidoCode, 2, 4);
    const expectedLevels = [EnvidoLevel.Envido, EnvidoLevel.RealEnvido];
    const cardOne = CardFactory.from('7E');
    const cardTwo = CardFactory.from('6E');

    const cardThree = CardFactory.from('4C');

    expect(envido.chanted).toStrictEqual(expectedLevels);
    expect(envido.accepted).toBeTruthy();
    expect(envido.cardsPlayed.get(2)?.cardOne).toStrictEqual(cardOne);
    expect(envido.cardsPlayed.get(2)?.cardTwo).toStrictEqual(cardTwo);
    expect(envido.cardsPlayed.get(3)?.cardOne).toStrictEqual(cardThree);
    expect(envido.cardsPlayed.get(3)?.cardTwo).toStrictEqual(undefined);
  });
});
