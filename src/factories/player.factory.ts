import { Player } from '../models/player';
import { Team } from '../types';
import { CardFactory } from './card.factory';

/**
 * A factory for creating Players for a Hand of Truco
 *
 * @class PlayerFactory
 * @description Creates the players for a game of Truco
 */
export class PlayerFactory {
  /**
   * Returns an array of Player objects based on the numberOfPlayers passed
   *
   * @static
   * @param {number} - The number of players of the game
   * @throws {Error} - If the numberOfPlayer is different of 2, 4 or 6
   * @returns {Player[]} - The array of players for the Hand of Truco
   */
  public static createPlayers(numberOfPlayers: number): Player[] {
    if (![2, 4, 6].includes(numberOfPlayers)) {
      throw Error('Invalid number of players');
    }

    const teams = [Team.A, Team.B];
    const players = [...Array(numberOfPlayers).keys()];

    return players.map((_, index) => new Player(index, teams[index % 2], []));
  }

  /**
   * Returns an array of Player objects with the cards dealt for each player
   *
   * @param {number} - The number of players of the game
   * @returns {Player[]} - The array of players for the Hand of Truco
   */
  public static from(
    numberOfPlayers: number,
    serializedCardsDealt: string,
  ): Player[] {
    const players = this.createPlayers(numberOfPlayers);

    const cardsDealt = serializedCardsDealt.match(/\d+[A-Z]/g);

    if (cardsDealt) {
      const cards = cardsDealt.map((c) => CardFactory.from(c));
      [...Array(numberOfPlayers)].forEach(
        (_, i) => (players[i].cards = cards.slice(i * 3, i * 3 + 3)),
      );
    }

    return players;
  }
}
