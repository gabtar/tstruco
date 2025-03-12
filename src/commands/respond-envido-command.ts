import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { HandPhase } from '../types';

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

    this.state.hand.envido.accepted = this.accepted;

    if (this.accepted) {
      this.state.hand.turns.chantEnvidoTurn =
        this.state.hand.turns.firstEnvidoChant;
      this.state.hand.phase = HandPhase.PlayEnvido;
    } else {
      this.state.hand.turns.chantEnvidoTurn =
        this.state.hand.turns.playCardTurn;
      this.state.hand.phase = HandPhase.PlayTruco;

      this.state.score.add(
        this.player.opponentTeam(),
        this.state.hand.envido.totalScorePoints(),
      );
    }

    return this.state;
  }
}
