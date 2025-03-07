import { PlayerNumber, Team } from '../types';
import { Card } from './card';

/**
 * Represents a player in a game of truco.
 * 
 * @class Player
 * @description A class that manages the player during a game of Truco
 */
export class Player {

  /*
   * Creates a new Player instance
   *
   * @param {PlayerNumber} id - The number of the player in the game
   * @param {Team} team - The team of the player
   * @param {Cards[]} - The cards the player holds during a hand
   */
  constructor(
    public id: PlayerNumber,
    public team: Team,
    public cards: Card[],
  ) { }

  /*
   * Returns the opponent Team of the player
   *
   * @returns {Team} - The opponent team of the player
   */
  public opponentTeam(): Team {
    return this.team === 0 ? Team.B : Team.A;
  }

  /*
   * Returns if the player has a Flor
   *
   * @returns {boolean} - True if has a Flor
   */
  public hasFlor(): boolean {
    const suit = this.cards[0].suit;

    return this.cards.every((card) => card.suit == suit);
  }

  /**
   * Returns if the player has the card
   *
   * @param {Card} card - The card to check if the user has
   * @returns {boolean} - True if the card has been dealt to the player during the hand
   */
  public hasCard(card: Card): boolean {
    if (this.cards.find(c => card.equals(c))) {
      return true
    };
    return false;
  }

  /*
   * Returns an string of the cards codes dealt to the player
   * 
   * @returns {string} - The cards codes of the cards dealt
   */
  public serializeCards(): string {
    return this.cards.reduce((cards, card) => cards + card.toString(), '');
  }
}
