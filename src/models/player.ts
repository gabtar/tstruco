import { PlayerNumber, Team } from '../types';
import { Card } from './card';

export class Player {
  constructor(
    public id: PlayerNumber,
    public team: Team,
    public cards: Card[],
  ) { }

  /*
   * opponentTeam
   * Returns the opponent Team of the player
   */
  public opponentTeam(): Team {
    return this.team === 0 ? Team.B : Team.A;
  }

  /*
   * hasFlor
   * Returns if the player has Flor
   */
  public hasFlor(): boolean {
    const suit = this.cards[0].suit;

    return this.cards.every((card) => card.suit == suit);
  }

  /*
  * serializeCards
  * Returns an string of the cards codes dealt to the player
  */
  public serializeCards(): string {
    return this.cards.reduce((cards, card) => cards + card.toString(), "");
  }
}
