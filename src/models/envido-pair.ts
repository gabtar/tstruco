import { Card } from './card';

/**
 * Represents the cards to be played during an envido play
 * 
 * @class EnvidoPair
 * @description A class for handling plays during the envido on a hand
 */
export class EnvidoPair {

  /**
   * Creates a new instance of an EnvidoPair
   *
   * @param {Card} cardOne - The first card to be played in the envido
   * @param {Card} [cardTwo] - Optional second card to be played(when both cards have the same rank)
   */
  constructor(
    public cardOne: Card,
    public cardTwo?: Card,
  ) { }

  /**
   * Returns the score of the envido pair
   *
   * @returns {number} - The total score for the envido of the card[s]
   */
  public score(): number {
    let score = this.cardOne.envidoScore;

    if (this.cardTwo && this.cardOne.suit === this.cardTwo.suit) {
      score += this.cardTwo.envidoScore + 20;
    }
    return score;
  }

  /*
   * Returns the string of the cards code
   *
   * @returns {string} - The serialized envido pair
   */
  public serialize(): string {
    return (
      this.cardOne.toString() + (this.cardTwo ? this.cardTwo.toString() : '')
    );
  }
}
