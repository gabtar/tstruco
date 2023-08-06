import { Card, Player, Round } from "./types";

// A hand of truco
export class Hand {
  constructor(
    private rounds: Round[] = [new Map<Player, Card>()],
    private currentRound = 0,
  ) { }

  playCard(player: Player, card: Card): void {
    if (this.rounds[this.currentRound].get(player) != undefined) {
      throw new Error("Ya jugaste una carta");
    }
    this.rounds[this.currentRound].set(player, card);
  }

  cardPlayed(player: Player, roundNumber: number): Card | undefined {
    return this.rounds[roundNumber].get(player);
  }
}
