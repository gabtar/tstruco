import { Team } from '../types';

/**
 * Represents the score in a game of truco.
 *
 * @class Score
 * @description A class for handling the score during the game
 */
export class Score {

  /**
   * Creates a new Score instance
   *
   * @param {number} maxGameScore - The maximum score possible in the game
   * @param {Map<Team, number>} score - A map representing the score of each team during the game
   */
  constructor(
    private maxGameScore: number,
    private score: Map<Team, number> = new Map([
      [Team.A, 0],
      [Team.B, 0],
    ]),
  ) { }

  /**
   * Increments the score of the team passed in the number of points passed
   *
   * @param {Team} team - The team we want to increment the score
   * @param {number} points - The total points to be incremented
   */
  public add(team: Team, points: number): void {
    this.score.set(team, this.score.get(team)! + points);
  }

  /**
   * Returns the score of the team passed
   *
   * @param {Team} team - The team we want to know the current score
   * @returns {number} - The score of the team
   */
  public getScore(team: Team) {
    return this.score.get(team)!;
  }

  /**
   * Returns the maximun score in the game so far
   *
   * @returns {number} - The max score of any team in the game
   */
  public maxScore(): number {
    return Math.max(...Array.from(this.score.values()));
  }

  /**
   * Returns the remaining score of the team passed to win the game
   *
   * @param {Team} team - The team who want to know the remaining score to end the game
   * @returns {number} - The remaining score
   */
  public remainingScore(team: Team): number {
    return this.maxGameScore - this.getScore(team)!;
  }

  /**
   * Returns the encoded string of the current score
   *
   * @returns {string} - The enconded string representation of the score of each team in the game
   */
  public serialize(): string {
    return 'A' + this.getScore(Team.A) + 'B' + this.getScore(Team.B);
  }
}
