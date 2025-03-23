import { GameRules } from '../types';

/**
 * A factory for creating Rules for a game of Truco
 *
 * @class RulesFactory
 * @description Creates rules from serilized Rules codes
 */
export class RulesFactory {
  /**
   * Returns a Rules object based on the serilized rules passed
   *
   * @param {string} serializedRules - The string with the serialized rules of a game of Truco
   * @param {string} serializedNumberOfPlayers - The number of players in the game
   * @returns {GameRules} - The GameRules object with the rules of the game
   */
  public static from(
    serializedRules: string,
    serializedNumberOfPlayers: string,
  ): GameRules {
    const flor = serializedRules.includes('F') ? true : false;
    const maxPoints = serializedRules.match(/\d+/)![0];

    return {
      numberOfPlayers: Number(serializedNumberOfPlayers),
      flor: flor,
      maxPoints: +maxPoints,
    };
  }
}
