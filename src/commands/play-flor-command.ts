import { Card } from "../models/card";
import { GameState } from "../models/game-state";
import { Player } from "../models/player";
import { Command } from "./play-card-command";

export class PlayFlorCommand implements Command {
  constructor(
    private state: GameState,
    private player: Player,
    private cards: Card[],
  ) { }

  public execute(): GameState {
    return this.state;
  }
}
