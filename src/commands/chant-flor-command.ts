import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { FlorLevel, GamePhase } from '../types';
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

    this.state.hand.flor!.chant(this.level);
    this.state.hand.phase = GamePhase.ChantFlor;

    // TODO: disable envido...
    // TODO: update chant flor turn, should be team response?

    return this.state;
  }
}
