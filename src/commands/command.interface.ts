import { GameState } from '../models/game-state';

/**
 * Represents a command in the command pattern.
 *
 * @interface Command
 * @description Defines the contract for executable commands that produce a new GameState
 */
export interface Command {
  /**
   * Executes the command and returns the new state.
   *
   * @returns {GameState} - The new state of the game
   */
  execute(): GameState;
}
