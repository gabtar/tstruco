import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { HandPhase } from '../types';
import { Command } from './command.interface';
import { NewHandCommand } from './new-hand-command';

/**
 * A command to modify the state of the game when a player resigns in current hand
 *
 * @class GoToDeckCommand
 * @description A class to perform a Go to deck in a hand of Truco
 */
export class GoToDeckCommand implements Command {
  /**
   * Creates a new GoToDeckCommand instance
   *
   * @param {GameState} state - The current state of the game
   * @param {Player} player - The player who is resigning in the current hand
   */
  constructor(
    private state: GameState,
    private player: Player,
  ) {}

  /**
   * Sends a player to deck and he cannot make any action during the current hand
   *
   * @returns {GameState} - The new state of the game
   */
  public execute(): GameState {
    this.state.hand.turns.goToDeck(this.player.id);
    const atDeck = this.state.hand.turns.teamAtDeck();

    if (atDeck !== undefined) {
      let score = 0;

      score += this.trucoScore();
      score += this.envidoScore();
      score += this.florScore();

      this.state.score.add(this.player.opponentTeam(), score);

      return new NewHandCommand(this.state).execute();
    }

    return this.state;
  }

  /**
   * Returns the score of the truco when a player/team resigns according to the chants so far
   *
   * @private
   * @returns {number} - The score in points of the Truco play
   */
  private trucoScore(): number {
    const trucoLevel = this.state.hand.trucoLevel;
    const accepted =
      this.state.hand.phase !== HandPhase.ChantTruco && trucoLevel > 1;
    let score = trucoLevel;

    if (!accepted && trucoLevel > 1) {
      score--;
    }

    return score;
  }

  /**
   * Returns the score of the Envido when a player/team resigns according to the chants so far
   *
   * @private
   * @returns {number} - The score in points of the Envido play
   */
  private envidoScore(): number {
    let score = 0;
    const finished = this.state.hand.envido.accepted !== undefined;
    const firstRoundEnded = this.state.hand.currentRound > 1;
    const playing = this.state.hand.phase === HandPhase.PlayEnvido;

    if (playing) {
      score += this.state.hand.envido.totalScorePoints();
    } else if (!finished && !firstRoundEnded) {
      score++;
    }

    return score;
  }

  /**
   * Returns the score of the Flor when a player/team resigns according to the chants so far
   *
   * @private
   * @returns {number} - The score in points of the Flor play
   */
  private florScore(): number {
    let score = 0;
    const playing = this.state.hand.phase === HandPhase.PlayFlor;

    if (playing) {
      score += this.state.hand.flor!.totalScorePoints();
    }

    return score;
  }
}
