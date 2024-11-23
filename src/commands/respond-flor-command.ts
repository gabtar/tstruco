import { GameState } from "../models/game-state";
import { Player } from "../models/player";
import { GamePhase } from "../types";
import { Command } from "./play-card-command";

export class ResponseFlorCommand implements Command {
  constructor(
    private state: GameState,
    private player: Player,
    private accepted: boolean,
  ) { }

  execute(): GameState {
    if (this.player.team != this.state.hand.turns.responseFlorChantTurn) {
      throw Error(`${this.player.id} is not your turn!`);
    }

    this.state.hand.flor!.accepted = this.accepted

    if (this.accepted) {
      this.state.hand.turns.responseFlorChantTurn =
        this.state.hand.turns.firstFlorChant?.team;
      this.state.hand.phase = GamePhase.PlayFlor;
    } else {
      this.state.hand.phase = GamePhase.Truco;

      this.state.score.add(
        this.player.opponentTeam(),
        this.state.hand.flor!.totalScorePoints(),
      );
    }

    return this.state;
  }
}
