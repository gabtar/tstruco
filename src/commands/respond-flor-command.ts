import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { HandPhase } from '../types';
import { Command } from './command.interface';

/**
 * A command to modify the state of the game by responding a Flor chant
 *
 * @class RespondFlorCommand
 * @description A class to respond to a previous Flor chant
 */
export class RespondFlorCommand implements Command {
  /**
   * Creates a new RespondFlorCommand instance
   *
   * @param {GameState} state - The current state of the game
   * @param {Player} player - The player who is responding the envido
   * @param {boolean} accepted - If he accept the Flor or not
   */
  constructor(
    private state: GameState,
    private player: Player,
    private accepted: boolean,
  ) {}

  /**
   * Executes the response to the Flor chant
   *
   * @returns {GameState} - The new state of the game
   * @throws {Error} - If it's not player turn to respond the Flor
   */
  execute(): GameState {
    if (this.player.team != this.state.hand.turns.responseFlorChantTurn) {
      throw Error(`${this.player.id} is not your turn!`);
    }

    this.state.hand.flor!.accepted = this.accepted;

    if (this.accepted) {
      this.state.hand.turns.responseFlorChantTurn =
        this.state.hand.turns.firstFlorChant?.team;
      this.state.hand.phase = HandPhase.PlayFlor;
    } else {
      this.state.hand.phase = HandPhase.PlayTruco;

      this.state.score.add(
        this.player.opponentTeam(),
        this.state.hand.flor!.totalScorePoints(),
      );
    }

    return this.state;
  }
}
