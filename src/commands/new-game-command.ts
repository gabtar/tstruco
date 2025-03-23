import { GameStateFactory } from '../factories/game-state.factory';
import { GameState } from '../models/game-state';
import { GameRules } from '../types';
import { Command } from './command.interface';

/**
 * A command to modify the state of the game by creating a new game
 *
 * @class NewGameCommand
 * @description A class to create a new game of Truco according to the Rules
 */
export class NewGameCommand implements Command {
  /**
   * Creates a new NewGameCommand instance
   *
   * @param {GameRules} gameRules - The rules of the game of Truco
   */
  constructor(private gameRules: GameRules) {}

  /**
   * Creates the new game of Truco
   *
   * @returns {GameState} - The new state of the game according to the rules
   */
  public execute(): GameState {
    return GameStateFactory.createGame(this.gameRules);
  }
}
