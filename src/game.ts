import { Player } from './types';

// A game of truco
export class Game {
  constructor(
    private players: Player[] = []
  ) {}

  getPlayers(): Player[] { return this.players }

  addPlayer(player: Player): void {
    this.players.push(player);
  }
}
