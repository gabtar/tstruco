export class Score {

  constructor(
    private score: Map<string, number> = new Map([
      ['A', 0],
      ['B', 0],
    ]),
  ) { }

  /*
  * add
  * Increments the score of the team passed in the number of points passed
  */
  public add(team: string, points: number) {
    this.score.set(team, this.score.get(team)! + points);
  }

  /*
  * getScore
  * Returns the score of the team passed
  */
  public getScore(team: string) {
    return this.score.get(team)
  }

}
