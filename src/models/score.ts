import { Team } from '../types';

export class Score {
  constructor(
    private score: Map<Team, number> = new Map([
      [Team.A, 0],
      [Team.B, 0],
    ]),
  ) { }

  /*
   * add
   * Increments the score of the team passed in the number of points passed
   */
  public add(team: Team, points: number) {
    this.score.set(team, this.score.get(team)! + points);
  }

  /*
   * getScore
   * Returns the score of the team passed
   */
  public getScore(team: Team) {
    return this.score.get(team);
  }

  /*
  * maxScore
  * Returns the maximun score in the game
  */
  public maxScore(): number {
    return Math.max(...Array.from(this.score.values()));
  }
}
