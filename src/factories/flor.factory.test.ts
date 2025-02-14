import { FlorLevel } from '../types';
import { CardFactory } from './card.factory';
import { FlorFactory } from './flor.factory';

describe('#from', () => {
  it('Should return a declined flor with contraflor chanted when "CD-N"  is deserialized', () => {
    const flor = FlorFactory.from('CD-N', 1, 2);

    expect(flor.chanted).toBe(FlorLevel.ContraFlor);
    expect(flor.accepted).toBeFalsy();
  });

  it('Should return an accept flor with contraflor chanted, and 1E, 7E and 4E played by player 0 when "CA-01E7E4E-N"  is deserialized', () => {
    const flor = FlorFactory.from('RA-01E7E4E-N', 1, 2);
    const expectedCardsPlayed = [
      CardFactory.from('1E'),
      CardFactory.from('7E'),
      CardFactory.from('4E'),
    ];

    expect(flor.chanted).toBe(FlorLevel.ContraFlorAlResto);
    expect(flor.accepted).toBeTruthy();
    expect(flor.cardsPlayed.get(0)).toStrictEqual(expectedCardsPlayed);
  });
});
