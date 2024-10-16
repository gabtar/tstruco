import { Card } from "../models/card";
import { GameState } from "../models/game-state";
import { Player } from "../models/player";
import { Command } from "./play-card-command";

export class PlayEnvidoCommand implements Command {
  constructor(
    private state: GameState,
    private player: Player,
    private cards: Card[],
  ) { }

  public execute(): GameState {
    this.cards.forEach(card => {
      if (!this.player.cards.includes(card)) {
        throw new Error(`You dont have a ${card} card`);
      }
    });

    if (this.state.hand.turns.chantEnvidoTurn != this.player) {
      throw new Error(`${this.player.id} is not your turn!`);
    }

    this.state.hand.envido.playCards(this.player.id, this.cards);

    // TODO: check if all player played the envido...

    return this.state;
  }

}
