import { Card } from './card';

export class EnvidoPair {
  constructor(
    public cardOne: Card,
    public cardTwo?: Card,
  ) {}

  /**
   * score
   * Returns the score of the envido pair
   */
  score(): number {
    let score = this.cardOne.envidoScore;

    if (this.cardTwo && this.cardOne.suit === this.cardTwo.suit) {
      score += this.cardTwo.envidoScore + 20;
    }
    return score;
  }
}
