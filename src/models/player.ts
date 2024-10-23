import { Card } from './card';

export class Player {
  constructor(
    public id: number,
    public team: string,
    public cards: Card[],
  ) { }

  /*
  * opponentTeam
  * Returns the opponent Team of the player
  */
  public opponentTeam(): string {
    return this.team === 'A' ? 'B' : 'A';
  }
}
