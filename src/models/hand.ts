import { Deck } from './deck';
import { Player } from './player';
import { Round } from './round';
import { Turn } from './turn';

export class Hand {
  constructor(
    public deck: Deck,
    public players: Player[],
    public rounds: Round[],
    public turns: Turn,
    public handPlayer: number,
    public phase: string, // FIX: envido - truco or flor, should be a type or enum...
  ) {}

  /* Returns the current round */
  get currentRound(): number {
    for (let i = 0; i < 3; i++) {
      if (!this.rounds[i].isFinished()) {
        return i;
      }
    }
    return 0;
  }

  /** Returns the winner of the hand or null if not finished */
  winner(): Player | null {
    return null;
  }

  /** Returns the player according to the number passed or throws an error **/
  getPlayer(number: number): Player {
    if (number > this.players.length - 1 || number < 0) {
      throw Error('Invalid player');
    }

    return this.players[number];
  }
}
