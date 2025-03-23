import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { HandPhase } from '../types';
import { NewHandCommand } from './new-hand-command';

/**
 * A command to modify the state of the game by responding a Truco chant
 *
 * @class RespondTrucoCommmand
 * @description A class to respond to a previous Truco chant
 */
export class RespondTrucoCommmand {
  /**
   * Creates a new RespondTrucoCommmand instance
   *
   * @param {GameState} state - The current state of the game
   * @param {Player} player - The player who is responding the envido
   * @param {boolean} accepted - If he accept the Truco or not
   */
  constructor(
    private state: GameState,
    private player: Player,
    private accepted: boolean,
  ) {}

  /**
   * Executes the response to the Truco chant
   *
   * @returns {GameState} - The new state of the game
   * @throws {Error} - If it's not player turn to respond the Truco
   */
  public execute(): GameState {
    if (this.player.team != this.state.hand.turns.responseTrucoChantTurn) {
      throw Error(`${this.player.id} is not your turn!`);
    }

    if (this.accepted) {
      this.state.hand.turns.responseTrucoChantTurn = this.player.opponentTeam();
    } else {
      let score = this.state.hand.trucoLevel - 1;
      if (
        this.state.hand.currentRound === 0 &&
        this.state.hand.envido.chanted.length === 0
      ) {
        score += 1;
      }

      this.state.score.add(this.player.opponentTeam(), score);

      return new NewHandCommand(this.state).execute();
    }

    this.state.hand.phase = HandPhase.PlayTruco;

    return this.state;
  }
}
