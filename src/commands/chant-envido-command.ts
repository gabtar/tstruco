import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { EnvidoLevel, GamePhase } from '../types';

export class ChantEnvidoCommmand {
  constructor(
    private state: GameState,
    private player: Player,
    private chant: EnvidoLevel,
  ) {}

  public execute(): GameState {
    if (this.state.hand.currentRound > 0) {
      throw Error('Cannot chant envido!');
    }

    if (this.state.hand.turns.chantEnvidoTurn?.id != this.player.id) {
      throw Error('Not your turn!');
    }

    this.state.hand.phase = GamePhase.ChantEnvido;

    this.state.hand.envido.addChant(this.chant);
    this.state.hand.turns.updateChantEnvidoTurn();

    return this.state;
  }
}
