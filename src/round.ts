import { Card, Player } from "./types";

export class Round {
  constructor(
    private _cardPlayed: Map<Player, Card> = new Map<Player, Card>(),
  ) {}

  cardPlayed(player: Player): Card | undefined {
    return this._cardPlayed.get(player);
  }

  playCard(player: Player, card: Card): void {
    const played = this._cardPlayed.get(player);

    if(played) {
      throw new Error('Ya jugaste una carta');
    }

    this._cardPlayed.set(player, card);
  }

  isFinished(): boolean {
    return this._cardPlayed.size == 2 ? true : false;
  }
}
