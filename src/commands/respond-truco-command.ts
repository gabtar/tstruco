import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { HandPhase } from '../types';
import { NewHandCommand } from './new-hand-command';

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
      let score = this.state.hand.trucoLevel - 1;
      if (
        this.state.hand.currentRound === 0 &&
        this.state.hand.envido.chanted.length === 0
      ) {
        score += 1;
      }

      this.state.score.add(this.player.opponentTeam(), score);

      return new NewHandCommand(this.state).execute();
    }

    this.state.hand.phase = HandPhase.PlayTruco;

    return this.state;
  }
}
