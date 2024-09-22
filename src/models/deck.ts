import { Card, Ranks, Suits } from './card';

export class Deck {
  private cards: Card[] = [];

  constructor() {
    for (let rank in Ranks) {
      for (let suit in Suits) {
        this.cards.push(new Card(rank, suit));
      }
    }
  }

  /*
   * Returns 3 random cards for each player
   */
  dealCards(numberOfPlayers: number): Card[] {
    this.shuffle();

    return this.cards.slice(0, 3 * numberOfPlayers);
  }

  /*
   * Shuffles the deck
   */
  private shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }
}
