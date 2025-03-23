import { Card } from '../models/card';
import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { HandPhase } from '../types';
import { Command } from './command.interface';

/**
 * A command to modify the state of the game by playing a card during a game of Truco
 *
 * @class PlayCardCommand
 * @description A class to play a card during a game
 */
export class PlayCardCommand implements Command {
  /**
   * Creates a new PlayCardCommand instance
   *
   * @param {GameState} state - The current state of the game
   * @param {Player} player - The player who playing a card
   * @param {Card} card - The card to be played in the current round
   */
  constructor(
    private state: GameState,
    private player: Player,
    private card: Card,
  ) {}

  /**
   * Plays a card in the current round
   *
   * @returns {GameState} - The new state of the game
   * @throws {Error} - If the card wasnt dealt to the player
   * @throws {Error} - If is not player's turn to play
   * @throws {Error} - If is not in PlayTruco phase
   * @throws {Error} - If the card was already played by the player(eg. in a previous round)
   */
  public execute(): GameState {
    if (!this.player.hasCard(this.card)) {
      throw new Error(`You dont have a ${this.card} card`);
    }

    if (this.state.hand.phase != HandPhase.PlayTruco) {
      throw Error(`Cannot play a card during ${this.state.hand.phase}!`);
    }

    if (this.state.hand.turns.playCardTurn != this.player) {
      throw Error(`${this.player.id} is not your turn!`);
    }

    if (this.alreadyPlayed(this.card)) {
      throw Error(`${this.card} was already played`);
    }

    const currentRound = this.state.hand.rounds[this.state.hand.currentRound];
    this.state.hand.playCard(this.player, this.card);

    if (currentRound.isFinished() && this.state.hand.currentRound < 2) {
      this.advanceToNextRound();
    }

    const winner = this.state.hand.winner();

    if (winner != undefined) {
      const trucoPoints = this.state.hand.trucoLevel;
      this.state.score.add(winner, trucoPoints);
    }

    return this.state;
  }

  /**
   * Checks if the card passed was already played in a round
   *
   * @private
   * @param {Card} card - The card to check if it was played
   * @returns {boolean} - If the card was played
   */
  private alreadyPlayed(card: Card): boolean {
    return this.state.hand.rounds.some((round) =>
      Array.from(round.cardsPlayed.values()).includes(card),
    );
  }

  /**
   * Updates the game state by setting the turns of the next round
   */
  private advanceToNextRound(): void {
    const roundNumber = this.state.hand.currentRound - 1;
    const startingPlayerForNextRound =
      this.state.hand.rounds[roundNumber].winner()!;

    if (startingPlayerForNextRound.length > 1) {
      this.state.hand.turns.setTurns(
        startingPlayerForNextRound![startingPlayerForNextRound.length - 1],
      );
    } else {
      this.state.hand.turns.setTurns(startingPlayerForNextRound![0]);
    }
  }
}
