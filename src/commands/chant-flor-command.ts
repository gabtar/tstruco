import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { FlorLevel, HandPhase } from '../types';
import { Command } from './command.interface';

/**
 * A command to modify the state of the game by chanting Flor
 *
 * @class ChantFlorCommand
 * @description A class to perform a Flor chant during a game of Truco
 */
export class ChantFlorCommand implements Command {
  /**
   * Creates a new ChantFlorCommand instance
   *
   * @param {GameState} state - The current state of the game
   * @param {Player} player - The player who is chanting the Flor
   * @param {EnvidoLevel} level - The level of Flor to chant in the game
   */
  constructor(
    private state: GameState,
    private player: Player,
    private level: FlorLevel,
  ) {}

  /**
   * Chants a Flor Level and returns the new state of the game
   *
   * @returns {GameState} - The new state of the game
   * @throws {Error} - If game rules does not allow Flor
   * @throws {Error} - If the player has not been dealt a flor
   * @throws {Error} - If not in first hand round
   */
  public execute(): GameState {
    if (!this.state.rules.flor) {
      throw new Error('You are playing without Flor');
    }

    if (!this.player.hasFlor()) {
      throw new Error('You dont have a Flor');
    }

    if (this.state.hand.currentRound > 0) {
      throw Error('Cannot chant flor!');
    }

    if (!this.state.hand.turns.firstFlorChant) {
      this.state.hand.turns.firstFlorChant = this.player;
    }

    const opponentTeamHasFlor =
      this.state.hand.players.filter(
        (p) => p.hasFlor() && p.team !== this.player.team,
      ).length > 0;

    if (opponentTeamHasFlor) {
      // NOTE:  For now is mandatory to respond a flor if the opponent has one
      this.state.hand.flor!.chant(this.level);
      this.state.hand.phase = HandPhase.ChantFlor;
      this.state.hand.turns.responseFlorChantTurn = this.player.opponentTeam();

      this.state.hand.phase = HandPhase.ChantFlor;
    } else {
      this.state.hand.flor!.chant(this.level);
      this.state.score.add(this.player.team, 3);
      this.state.hand.phase = HandPhase.PlayTruco;
    }

    return this.state;
  }
}
