import { GameStateFactory } from '../factories/game-state.factory';
import { GameState } from '../models/game-state';
import { GameRules } from '../types';
import { Command } from './play-card-command';

export class NewGameCommand implements Command {
  constructor(private gameRules: GameRules) { }

  public execute(): GameState {
    return GameStateFactory.createGame(this.gameRules);
  }
}
