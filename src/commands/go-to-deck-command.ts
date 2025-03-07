import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { NewHandCommand } from './new-hand-command';
import { Command } from './play-card-command';

export class GoToDeckCommand implements Command {
  constructor(
    private state: GameState,
    private player: Player,
  ) { }

  public execute(): GameState {
    this.state.hand.turns.goToDeck(this.player.id);
    const atDeck = this.state.hand.turns.teamAtDeck();

    if (atDeck !== undefined) {
      let score = this.state.hand.trucoLevel - 1;
      if (this.state.hand.currentRound === 0 && this.state.hand.envido.chanted.length === 0) {
        score += 1;
      }

      this.state.score.add(atDeck, score);

      return new NewHandCommand(this.state).execute();
    }

    return this.state;
  }
}
