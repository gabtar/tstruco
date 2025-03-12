import { GameRules, Status } from '../types';
import { Hand } from './hand';
import { Score } from './score';

/**
 * Represents the status of a game of Truco
 *
 * @class GameState
 * @description A class that haldes a game of Truco
 */
export class GameState {
  /**
   * Creates a new GameState instance
   *
   * @param {Hand} hand - The hand of the game of Truco
   * @param {GameRules} rules - The rules to play the game
   * @param {Score} score - The score of the current game
   * @param {Status} status - The current status of the game
   */
  constructor(
    public hand: Hand,
    public rules: GameRules,
    public score: Score,
    public status: Status = Status.IN_PROGRESS,
  ) {}
}
