import { Card } from '../models/card';
import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { HandPhase } from '../types';
import { Command } from './command.interface';

/**
 * A command to modify the state of the game by playing Flor
 *
 * @class PlayFlorCommand
 * @description A class to perform a Flor play during a game of Truco
 */
export class PlayFlorCommand implements Command {
  /**
   * Creates a new PlayFlorCommand instance
   *
   * @param {GameState} state - The current state of the game
   * @param {Player} player - The player who is playing the Flor
   * @param {Cards[]} cards - The cards to be played
   */
  constructor(
    private state: GameState,
    private player: Player,
    private cards: Card[],
  ) {}

  /**
   * Executes the Flor play with the cards passed
   *
   * @returns {GameState} - The new game state
   */
  public execute(): GameState {
    this.state.hand.flor!.playCards(this.player.id, this.cards);

    if (
      this.state.hand.flor!.florPlaysCount == this.state.rules.numberOfPlayers
    ) {
      const flowerPoints = this.state.hand.flor!.totalScorePoints();
      const winner = this.state.hand.flor!.winner();
      this.state.score.add(
        this.state.hand.getPlayer(winner).team,
        flowerPoints,
      );

      this.state.hand.phase = HandPhase.PlayTruco;
    }

    return this.state;
  }
}
