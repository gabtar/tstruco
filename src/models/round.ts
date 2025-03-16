import { Card } from './card';
import { Player } from './player';

/**
 * Represents a Round of a hand of truco
 *
 * @class Round
 * @description A class that manages the cards played during a round of a Hand of Truco
 */
export class Round {
  /**
   * Creates a new Round instance
   *
   * @param {Map<Player, Card>} cardsPlayed - The card played by each player during the round
   * @param {Player[]} players - The players who are participating in the round
   */
  constructor(
    public cardsPlayed: Map<Player, Card>,
    public players: Player[],
  ) {}

  /**
   * Returns if the round is already finished
   *
   * @returns {boolean} - If all the players have played a card
   */
  public isFinished(): boolean {
    return this.cardsPlayed.size === this.players.length;
  }

  /**
   * Plays a card in a round
   *
   * @param {Player} player - The player who is playing the card
   * @param {Card} card - The card object he is playing
   */
  public playCard(player: Player, card: Card): void {
    if (this.cardsPlayed.get(player)) {
      throw Error('Player already played a card in this round!');
    }
    this.cardsPlayed.set(player, card);
  }

  /**
   * Returns the winner(s) of the round. If both players play the highest card value, it returns both players
   *
   * @returns {Player[]|undefined} - The player(s) who won the round or undefined
   */
  public winner(): Player[] | undefined {
    if (!this.isFinished()) {
      return undefined;
    }

    const highestValue = Math.max(
      ...Array.from(this.cardsPlayed.values()).map((card) => card.value()),
    );

    return Array.from(this.cardsPlayed.keys()).filter(
      (player) => this.cardsPlayed.get(player)?.value() == highestValue,
    );
  }

  /**
   * Returns the encoded string of the cards played during the round
   *
   * @returns {string} - The string code of the cards played during the hand
   */
  public serialize(): string {
    let s = '';
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (this.cardsPlayed.has(player)) {
        s += this.cardsPlayed.get(player)!.toString();
      } else {
        s += '0';
      }
    }
    return s;
  }
}
