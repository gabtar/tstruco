import { PlayerNumber, Team } from '../types';
import { Card } from './card';

export class Player {
  constructor(
    public id: PlayerNumber,
    public team: Team,
    public cards: Card[],
  ) {}

  /*
   * opponentTeam
   * Returns the opponent Team of the player
   */
  public opponentTeam(): Team {
    return this.team === 0 ? Team.B : Team.A;
  }
}
