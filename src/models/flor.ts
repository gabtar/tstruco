import { FlorLevel, PlayerNumber } from '../types';
import { Card } from './card';

export class Flor {
  constructor(
    private handPlayerOrder: number[],
    private flowerScore = [4, 6, 30, 3, 4, 6], // Accepted: 4 6 30 Declined: 3 4 6
    public cardsPlayed: Map<PlayerNumber, Card[]> = new Map<
      PlayerNumber,
      Card[]
    >(),
    public chanted?: FlorLevel,
    public accepted?: boolean,
  ) { }

  /*
   * chant
   * sets the FlorLevel passed
   */
  chant(chant: FlorLevel) {
    if (this.chanted !== undefined && chant <= this.chanted) {
      throw new Error('Invalid chant');
    }

    this.chanted = chant;
  }

  /*
   * playCards
   * plays the cards passed in the Flor
   */
  playCards(player: PlayerNumber, cards: Card[]): void {
    if (cards.length !== 3) {
      throw new Error('Invalid cards');
    }

    this.cardsPlayed.set(player, cards);
  }

  /*
   * totalScorePoints
   * Returns the total score points in the flor
   */
  totalScorePoints(): number {
    return this.accepted ? this.flowerScore[this.chanted!] : this.flowerScore[this.chanted! + 3]
  }

  /*
   * winner
   * returns the winner of the flor
   */
  winner(): number {
    return 0;
  }
}
