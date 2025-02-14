import { Player } from '../models/player';
import { Team } from '../types';
import { CardFactory } from './card.factory';

export class PlayerFactory {
  /*
   * createPlayers creates the necesary players for a game of truco
   * NOTE: number of players shoud be 2, 4, or 6
   */
  public static createPlayers(numberOfPlayers: number): Player[] {
    if (![2, 4, 6].includes(numberOfPlayers)) {
      throw Error('Invalid number of players');
    }

    const teams = [Team.A, Team.B];
    const players = [...Array(numberOfPlayers).keys()];

    return players.map((_, index) => new Player(index, teams[index % 2], []));
  }

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
