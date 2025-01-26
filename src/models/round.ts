import { Card } from './card';
import { Player } from './player';

export class Round {
  constructor(
    // cardsPlayed is a map that holds the card that a player has been played
    public cardsPlayed: Map<Player, Card>,
    public players: Player[],
  ) { }

  /* Returns if the round is already finished */
  public isFinished(): boolean {
    return this.cardsPlayed.size === this.players.length;
  }

  /* Plays a card in the round */
  public playCard(player: Player, card: Card): void {
    if (this.cardsPlayed.get(player)) {
      throw Error('Player already played a card in this round!');
    }
    this.cardsPlayed.set(player, card);
  }

  /* Returns the winner of the round */
  public winner(): Player[] | undefined {
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

  /*
   * serialize
   * Returns the encoded string with the cards played during the round by each player
   */
  public serialize(): string {
    let s = "";
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (this.cardsPlayed.has(player)) {
        s += this.cardsPlayed.get(player)!.toString();
      } else {
        s += "0";
      }
    }
    return s;
  }
}
