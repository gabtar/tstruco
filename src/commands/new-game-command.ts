import { GameStateFactory } from '../factories/game-state.factory';
import { GameState } from '../models/game-state';
import { GameRules } from '../types';

export class NewGameCommand {
  constructor(private gameRules: GameRules) { }

  public execute(): GameState {
    return GameStateFactory.createGame(this.gameRules);
  }
}
