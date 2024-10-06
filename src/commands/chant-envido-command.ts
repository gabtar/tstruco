import { GameState } from '../models/game-state';

export class ChantEnvidoCommmand {
  constructor(private state: GameState) {}

  public execute(): GameState {
    if (this.state.hand.currentRound > 0) {
      throw Error('Cannot chant envido!');
    }

    return this.state;
  }
}
