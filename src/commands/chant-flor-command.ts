import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { FlorLevel, HandPhase } from '../types';
import { Command } from './play-card-command';

export class ChantFlorCommand implements Command {
  constructor(
    private state: GameState,
    private player: Player,
    private level: FlorLevel,
  ) {}

  public execute(): GameState {
    if (!this.state.rules.flor) {
      throw new Error('You are playing without Flor');
    }

    if (!this.player.hasFlor()) {
      throw new Error('You dont have a Flor');
    }

    if (this.state.hand.currentRound > 0) {
      throw Error('Cannot chant flor!');
    }

    if (
      this.state.hand.flor!.chanted &&
      this.level <= this.state.hand.flor!.chanted
    ) {
      throw Error('Invalid flor level');
    }

    if (!this.state.hand.turns.firstFlorChant) {
      this.state.hand.turns.firstFlorChant = this.player;
    }

    this.state.hand.flor!.chant(this.level);
    this.state.hand.phase = HandPhase.ChantFlor;
    this.state.hand.turns.responseFlorChantTurn = this.player.opponentTeam();

    return this.state;
  }
}
