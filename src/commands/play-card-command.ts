import { Card } from '../models/card';
import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { HandPhase } from '../types';

export class PlayCardCommand implements Command {
  constructor(
    private state: GameState,
    private player: Player,
    private card: Card,
  ) {}

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

  private alreadyPlayed(card: Card): boolean {
    return this.state.hand.rounds.some((round) =>
      Array.from(round.cardsPlayed.values()).includes(card),
    );
  }

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

export interface Command {
  execute(): GameState;
}
