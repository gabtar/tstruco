import { GameState } from '../models/game-state';
import { Player } from '../models/player';

export class RespondTrucoCommmand {
  constructor(
    private state: GameState,
    private player: Player,
    private accepted: boolean,
  ) {}

  public execute(): GameState {
    if (this.player.team != this.state.hand.turns.responseTrucoChantTurn) {
      throw Error(`${this.player.id} is not your turn!`);
    }

    if (this.accepted) {
      this.state.hand.turns.responseTrucoChantTurn = this.player.opponentTeam();
    } else {
      this.state.score.add(
        this.player.opponentTeam(),
        this.state.hand.trucoLevel - 1,
      );
    }

    return this.state;
  }
}
