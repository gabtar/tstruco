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


// Game handles all logic of the game
// has a hand
//
// Game Actions....
// game.playCard()
// game.chant() // Envido Truco or Flor
// game.responseChant() // Acept / Decline or Rechant?
// game.startHand()
//
//
// game.score()

//
// // Tests
// let player1: Player = {name: 'Player1', cards: []} 
//
// let players: Player[] = [player1]
// let game = new Game([]);
//
// game.addPlayer(player1);
// console.log(game);
