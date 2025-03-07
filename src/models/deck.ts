import { Ranks, Suits } from '../types';
import { Card } from './card';

/**
 * Represents a Deck of spanish cards
 * 
 * @class Deck
 * @description A class that for storing and setting the cards during a game
 */
export class Deck {
  private cards: Card[] = [];

  /**
   * Creates a new Deck instance
   */
  constructor() {
    for (const rank in Ranks) {
      for (const suit in Suits) {
        this.cards.push(new Card(Ranks[rank], Suits[suit]));
      }
    }
  }

  /**
   * Returns 3 random cards for each player
   *
   * @param {number} numberOfPlayers - The number of players to deal cards
   * @returns {Card[]} - An array containing the total cards dealed for the number of players passed
   */
  dealCards(numberOfPlayers: number): Card[] {
    this.shuffle();

    return this.cards.slice(0, 3 * numberOfPlayers);
  }

  /*
   * Shuffles the deck
   *
   */
  private shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }
}
