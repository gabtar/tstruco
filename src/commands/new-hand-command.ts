import { HandFactory } from '../factories/hand.factory';
import { GameState } from '../models/game-state';
import { Command } from './play-card-command';

export class NewHandCommand implements Command {
  constructor(private state: GameState) {}

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
