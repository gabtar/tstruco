import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { HandPhase } from '../types';

/**
 * A command to modify the state of the game by responding an Envido chant
 *
 * @class RespondEnvidoCommmand
 * @description A class to respond to a previous Envido chant
 */
export class RespondEnvidoCommmand {
  /**
   * Creates a new RespondEnvidoCommmand instance
   *
   * @param {GameState} state - The current state of the game
   * @param {Player} player - The player who is responding the envido
   * @param {boolean} accepted - If he accept the envido or not
   */
  constructor(
    private state: GameState,
    private player: Player,
    private accepted: boolean,
  ) {}

  /**
   * Executes the response to the envido chant
   *
   * @returns {GameState} - The new state of the game
   * @throws {Error} - If it's not player turn to respond the envido
   */
  public execute(): GameState {
    if (this.player != this.state.hand.turns.chantEnvidoTurn) {
      throw Error(`${this.player.id} is not your turn!`);
    }

    this.state.hand.envido.accepted = this.accepted;

    if (this.accepted) {
      this.state.hand.turns.chantEnvidoTurn =
        this.state.hand.turns.firstEnvidoChant;
      this.state.hand.phase = HandPhase.PlayEnvido;
    } else {
      this.state.hand.turns.chantEnvidoTurn =
        this.state.hand.turns.playCardTurn;
      this.state.hand.phase = HandPhase.PlayTruco;

      this.state.score.add(
        this.player.opponentTeam(),
        this.state.hand.envido.totalScorePoints(),
      );
    }

    return this.state;
  }
}
