import { HandFactory } from '../factories/hand.factory';
import { GameState } from '../models/game-state';
import { Command } from './command.interface';

/**
 * A command to modify the state of the game by creating a new hand
 *
 * @class NewHandCommand
 * @description A class to create a new hand in a new game or in a game that a hand has already ended
 */
export class NewHandCommand implements Command {
  /**
   * Creates a new NewGameCommand instance
   *
   * @param {GameState} state - The current game state
   */
  constructor(private state: GameState) {}

  /**
   * Creates a new hand by setting the turns and deal the cards to the players
   *
   * @returns {GameState} - The new state of the game
   */
  public execute(): GameState {
    const actualHandPlayer = this.state.hand.turns.handPlayer?.id;
    const numberOfPlayers = this.state.rules.numberOfPlayers;

    const newHand = HandFactory.createHand(this.state.hand.players);
    newHand.dealCards();

    if (actualHandPlayer === undefined) {
      newHand.turns.drawInitialTurns();
    } else {
      const nextHandPlayer =
        actualHandPlayer === numberOfPlayers - 1 ? 0 : actualHandPlayer + 1;

      newHand.turns.handPlayer = newHand.players[nextHandPlayer];
      newHand.turns.setTurns(newHand.players[nextHandPlayer]);
    }

    this.state.hand = newHand;

    return this.state;
  }
}
