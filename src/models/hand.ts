import { Deck } from './deck';
import { Player } from './player';
import { Round } from './round';

export class Hand {
  constructor(
    public deck: Deck,
    public players: Player[],
    public rounds: Round[],
    public handPlayer: number,
    public phase: string, // envido - truco or flor
  ) { }

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
}
