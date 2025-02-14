import { GameRules } from '../types';

export class RulesFactory {
  /*
   * Returns a set of rules based on the arguments passed
   */
  public static from(
    serializedRules: string,
    serializedNumberOfPlayers: string,
  ): GameRules {
    const flor = serializedRules.includes('F') ? true : false;
    const maxPoints = serializedRules.match(/\d+/)![0];

    return {
      numberOfPlayers: +serializedNumberOfPlayers,
      flor: flor,
      maxPoints: +maxPoints,
    };
  }
}
