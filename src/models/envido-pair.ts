import { Card } from './card';

export class EnvidoPair {
  constructor(
    public cardOne: Card,
    public cardTwo?: Card,
  ) { }

  /**
   * score
   * Returns the score of the envido pair
   */
  public score(): number {
    let score = this.cardOne.envidoScore;

    if (this.cardTwo && this.cardOne.suit === this.cardTwo.suit) {
      score += this.cardTwo.envidoScore + 20;
    }
    return score;
  }

  /*
   * serialize
   * Returns the string of the cards code
   */
  public serialize(): string {
    return this.cardOne.toString() + (this.cardTwo ? this.cardTwo.toString() : "");
  }
}
