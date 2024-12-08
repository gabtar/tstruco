import { GameState } from "../models/game-state";
import { Player } from "../models/player";
import { Team } from "../types";
import { Command } from "./play-card-command";

export class GoToDeckCommand implements Command {
  constructor(
    private state: GameState,
    private player: Player,
  ) { }

  public execute(): GameState {
    this.state.hand.turns.goToDeck(this.player.id);
    const atDeck = this.state.hand.turns.teamAtDeck();
    const winner = atDeck === Team.A ? Team.B : Team.A;

    if (atDeck) {
      this.state.score.add(atDeck, this.state.hand.trucoLevel);
    }

    return this.state;
  }
}
