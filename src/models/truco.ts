import { CommandHandler } from '../commands/command-handler';
import { GameStateFactory } from '../factories/game-state.factory';
import { ActionParams } from '../types';
import { GameState } from './game-state';

export class Truco {
  constructor(
    private state: GameState = GameStateFactory.createGame({
      numberOfPlayers: 2,
      flor: false,
      maxPoints: 15,
    }),
    private handler: CommandHandler = new CommandHandler(),
  ) {}

  action<K extends keyof ActionParams>(
    actionType: K,
    params: ActionParams[K],
  ): void {
    this.state = this.handler.handle(actionType, params, this.state);
  }

  getState(): GameState {
    return this.state;
  }
}
