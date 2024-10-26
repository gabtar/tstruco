import { GamePhase, TrucoLevel } from '../types';
import { Deck } from './deck';
import { Envido } from './envido';
import { Player } from './player';
import { Round } from './round';
import { Turn } from './turn';

export class Hand {
  constructor(
    public deck: Deck,
    public players: Player[],
    public rounds: Round[],
    public envido: Envido,
    public turns: Turn,
    public phase: GamePhase,
    public trucoLevel: TrucoLevel = TrucoLevel.NotChanted,
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

  /** Returns the winner of the hand or undefined if not finished */
  winner(): Player | undefined {
    // TODO: get the winner of the hand...
    return undefined;
  }

  /** Returns the player according to the number passed or throws an error **/
  getPlayer(number: number): Player {
    if (number > this.players.length - 1 || number < 0) {
      throw Error('Invalid player');
    }

    return this.players[number];
  }

  /** Deals cards to all players in the hand **/
  dealCards(): void {
    const cards = this.deck.dealCards(this.players.length);

    for (let i = 0; i < this.players.length; i++) {
      this.players[i].cards = cards.splice(0, 3);
    }
  }
}
