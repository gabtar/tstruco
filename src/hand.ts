import { Round } from "./round";
import { Card, Player } from "./types";

// A hand of truco
export class Hand {
  constructor(
    private rounds: Round[] = [new Round(), new Round(), new Round()],
    private currentRound = 0,
  ) { }

  playCard(player: Player, card: Card): void {
    this.rounds[this.currentRound].playCard(player, card);
  }

  cardPlayed(player: Player, roundNumber: number): Card | undefined {
    return this.rounds[roundNumber].cardPlayed(player);
  }
}
