import { Card } from './card';
import { Player } from './player';

export class Round {
  constructor(
    // cardsPlayed is a map that holds the card that a player has been played
    public cardsPlayed: Map<Player, Card>,
    public players: Player[],
  ) {}

  /* Returns if the round is already finished */
  isFinished(): boolean {
    return this.cardsPlayed.size === this.players.length;
  }

  /* Plays a card in the round */
  playCard(player: Player, card: Card): void {
    if (this.cardsPlayed.get(player)) {
      throw Error('Player already played a card in this round!');
    }
    this.cardsPlayed.set(player, card);
  }

  /* Returns the winner of the round */
  winner(): Player[] | undefined {
    if (!this.isFinished()) {
      return undefined;
    }

    const highestValue = Math.max(
      ...Array.from(this.cardsPlayed.values()).map((card) => card.value()),
    );

    return Array.from(this.cardsPlayed.keys()).filter(
      (player) => this.cardsPlayed.get(player)?.value() == highestValue,
    );
  }
}
