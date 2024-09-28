import { Card, Ranks, Suits } from './card';

export class Deck {
  private cards: Card[] = [];

  constructor() {
    for (const rank in Ranks) {
      for (const suit in Suits) {
        this.cards.push(new Card(Ranks[rank], Suits[suit]));
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
