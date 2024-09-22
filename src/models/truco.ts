import { CommandHandler } from '../commands/command-handler';
import { Action, ActionRequest } from '../types';
import { GameState } from './game-state';

export class Truco {
  constructor(
    private state: GameState,
    private handler: CommandHandler = new CommandHandler(),
  ) {}

  action(actionType: Action, actionRequest: ActionRequest): void {
    this.handler.handle(actionType, actionRequest, this.state);
  }
}
