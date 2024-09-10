import { Player } from '../models/player';

export class PlayerFactory {
  /*
   * createPlayers creates the necesary players for a game of truco
   * NOTE: number of players shoud be 2, 4, or 6
   */
  public static createPlayers(numberOfPlayers: number): Player[] {
    const teams = ['A', 'B'];
    const players = [...Array(numberOfPlayers).keys()];

    return players.map(
      (player, index) => new Player(index, teams[index % 2], []),
    );
  }
}
