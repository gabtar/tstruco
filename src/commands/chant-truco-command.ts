import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { HandPhase, TrucoLevel } from '../types';
import { Command } from './command.interface';

/**
 * A command to modify the state of the game by chanting Truco
 *
 * @class ChantTrucoCommmand
 * @description A class to perform a Truco chant during a game of Truco
 */
export class ChantTrucoCommmand implements Command {
  /**
   * Creates a new ChantTrucoCommmand instance
   *
   * @param {GameState} state - The current state of the game
   * @param {Player} player - The player who is chanting the Truco
   * @param {TrucoLevel} chant - The level of Truco to chant in the game
   */
  constructor(
    private state: GameState,
    private player: Player,
    private chant: TrucoLevel,
  ) {}

  /**
   * Chants a Truco Level and returns the new state of the game
   *
   * @returns {GameState} - The new state of the game
   * @throws {Error} - If not player turn to chant Truco
   * @throws {Error} - If the truco level chanted is lower than the actual truco level
   */
  public execute(): GameState {
    if (!this.canChantTruco()) {
      throw Error('Not your turn!');
    }

    if (this.chant <= this.state.hand.trucoLevel) {
      throw Error('Invalid Truco Level');
    }

    this.state.hand.trucoLevel = this.chant;
    this.state.hand.phase = HandPhase.ChantTruco;
    this.state.hand.turns.responseTrucoChantTurn = this.player.opponentTeam();

    return this.state;
  }

  /**
   * Returns if the Truco chant is available or is awaiting the opponent's response
   *
   * @returns {boolean} - True if can chant
   */
  private canChantTruco(): boolean {
    const responseTrucoChantTurn = this.state.hand.turns.responseTrucoChantTurn;

    if (responseTrucoChantTurn === undefined) {
      return true;
    }

    return responseTrucoChantTurn == this.player.team;
  }
}
