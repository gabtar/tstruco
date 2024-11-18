import { FlorLevel, PlayerNumber } from '../types';
import { Card } from './card';

export class Flor {
  constructor(
    private handPlayerOrder: number[],
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
    // scores
    // accepted = flor = 4, contraflor = 6, contrafloralresto = 30
    // declined = flor = 3, contraflor = 4, contrafloralresto = 6

    const flowerLevels = Object.values(FlorLevel).slice(2) as Array<number>;
    let score = this.chanted;
    if (!this.accepted) {
      score = flowerLevels[this.chanted! - 1];
    }
    console.log("SCORE: ", score);
    return score!;
  }

  /*
   * winner
   * returns the winner of the flor
   */
  winner(): number {
    return 0;
  }
}
