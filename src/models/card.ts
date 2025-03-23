/**
 * Represents a Card in the game.
 *
 * @class Card
 * @description A class that handles the cards during the game of Truco
 */
export class Card {
  /**
   * A Map representing the value of each card for a Truco play
   *
   * @private
   */
  private readonly trucoCardValue = new Map<string, number>([
    ['1E', 13],
    ['1B', 12],
    ['7E', 11],
    ['7O', 10],
    ['3E', 9],
    ['3B', 9],
    ['3O', 9],
    ['3C', 9],
    ['2E', 8],
    ['2B', 8],
    ['2O', 8],
    ['2C', 8],
    ['1O', 7],
    ['1C', 7],
    ['12E', 6],
    ['12B', 6],
    ['12O', 6],
    ['12C', 6],
    ['11E', 5],
    ['11B', 5],
    ['11O', 5],
    ['11C', 5],
    ['10E', 4],
    ['10B', 4],
    ['10O', 4],
    ['10C', 4],
    ['7B', 3],
    ['7C', 3],
    ['6E', 2],
    ['6B', 2],
    ['6O', 2],
    ['6C', 2],
    ['5E', 1],
    ['5B', 1],
    ['5O', 1],
    ['5C', 1],
    ['4E', 0],
    ['4B', 0],
    ['4O', 0],
    ['4C', 0],
  ]);

  /**
   * Creates a new Card instance
   *
   * @param {Ranks} rank - The card rank
   * @param {Suits} suit - The card suit
   */
  constructor(
    public rank: string,
    public suit: string,
  ) {}

  /**
   * Returns if this card is equal to the card passed
   *
   * @param {Card} other - The other card to compare
   * @returns {boolean} - True if both cards have the same rank and suit
   */
  public equals(other: Card): boolean {
    return this.suit === other.suit && this.rank === other.rank;
  }

  /**
   * Returns the cardCode string asociated with the card
   *
   * @returns {string} - Card code resulted with the rank and suit of the card
   */
  public toString(): string {
    return this.rank + this.suit;
  }

  /**
   * Returns the envido score of the card
   *
   * @returns {number} - The value in numbers of the card for an envido play
   */
  public get envidoScore(): number {
    const rankNumber = Number(this.rank);
    return rankNumber >= 10 ? 0 : rankNumber;
  }

  /**
   * Returns the value of the card for truco play
   *
   * @returns {number} - The value of the card in Truco
   */
  public value(): number {
    return this.trucoCardValue.get(this.toString()) || 0;
  }
}
