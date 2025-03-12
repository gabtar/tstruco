import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { HandPhase } from '../types';
import { NewHandCommand } from './new-hand-command';
import { Command } from './play-card-command';

export class GoToDeckCommand implements Command {
  constructor(
    private state: GameState,
    private player: Player,
  ) {}

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

  private florScore(): number {
    let score = 0;
    const playing = this.state.hand.phase === HandPhase.PlayFlor;

    if (playing) {
      score += this.state.hand.flor!.totalScorePoints();
    }

    return score;
  }
}
