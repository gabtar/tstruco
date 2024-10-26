import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { GamePhase } from '../types';

export class RespondEnvidoCommmand {
  constructor(
    private state: GameState,
    private player: Player,
    private accepted: boolean,
  ) {}

  public execute(): GameState {
    if (this.player != this.state.hand.turns.chantEnvidoTurn) {
      throw Error(`${this.player.id} is not your turn!`);
    }

    if (this.accepted) {
      this.state.hand.envido.accepted = true;
      this.state.hand.turns.chantEnvidoTurn =
        this.state.hand.turns.firstEnvidoChant;
      this.state.hand.phase = GamePhase.PlayEnvido;
    } else {
      this.state.hand.envido.accepted = false;
      this.state.hand.turns.chantEnvidoTurn =
        this.state.hand.turns.playCardTurn;
      this.state.hand.phase = GamePhase.Truco;

      this.state.score.add(
        this.player.opponentTeam(),
        this.state.hand.envido.totalScorePoints(),
      );
    }

    return this.state;
  }
}
