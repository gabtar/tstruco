import { EnvidoLevel } from '../types';
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

    console.log(
      envido.chanted[-1] != EnvidoLevel.Envido &&
        EnvidoLevel.Envido < EnvidoLevel.FaltaEnvido,
    );
    console.log(EnvidoLevel.Envido);
    console.log(envido.chanted[-1]);

    expect(() => envido.addChant(EnvidoLevel.Envido)).toThrow(
      'Cannot chant Envido!',
    );
  });
});
