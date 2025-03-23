import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { EnvidoLevel, HandPhase } from '../types';
import { Command } from './command.interface';

/**
 * A command to modify the state of the game by chanting Envido
 *
 * @class ChantEnvidoCommmand
 * @description A class to perform an Envido chant during a game of Truco
 */
export class ChantEnvidoCommmand implements Command {
  /**
   * Creates a new ChantEnvidoCommmand instance
   *
   * @param {GameState} state - The current state of the game
   * @param {Player} player - The player who is chanting the Envido
   * @param {EnvidoLevel} chant - The level of envido to chant in the game
   */
  constructor(
    private state: GameState,
    private player: Player,
    private chant: EnvidoLevel,
  ) {}

  /**
   * Chants an envido Level and returns the new state of the game
   *
   * @returns {GameState} - The new state of the game
   * @throws {Error} - If flor has already been chanted in the hand
   * @throws {Error} - If already accepted or first hand round has finished
   * @throws {Error} - If not player turn to chant
   */
  public execute(): GameState {
    if (this.state.rules.flor && this.state.hand.flor?.chanted !== undefined) {
      throw new Error('Cannot chant Envido');
    }

    if (
      this.state.hand.currentRound > 0 ||
      this.state.hand.envido.accepted !== undefined
    ) {
      throw Error('Cannot chant envido!');
    }

    if (this.state.hand.turns.chantEnvidoTurn?.id != this.player.id) {
      throw Error('Not your turn!');
    }

    if (!this.state.hand.turns.firstEnvidoChant) {
      this.state.hand.turns.firstEnvidoChant = this.player;
    }

    this.state.hand.phase = HandPhase.ChantEnvido;

    this.state.hand.envido.addChant(this.chant);
    this.state.hand.turns.updateChantEnvidoTurn();

    return this.state;
  }
}
