import { Score } from '../models/score';
import { Team } from '../types';

/**
 * A factory for creating Score objects
 *
 * @class ScoreFactory
 * @description Creates a Score object from a serialized string of scores
 */
export class ScoreFactory {
  /**
   * Returns a new Score object from the serialized string passed
   *
   * @pram {string} serializedScore - The string serialized with the current score of a game of Truco
   * @param {number} maxScore - The max score for the game of Truco
   * @returns {Score} - The score object with the current score of the game
   */
  public static from(serializedScore: string, maxScore: number): Score {
    const score = new Score(maxScore);
    const scores = serializedScore.match(/\d+/g)!;

    score.add(Team.A, Number(scores[0]));
    score.add(Team.B, Number(scores[1]));

    return score;
  }
}
