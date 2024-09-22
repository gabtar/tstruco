import { Card } from '../models/card';
import { Hand } from '../models/hand';
import { Player } from '../models/player';

export class PlayCardCommand implements Command {
  constructor(
    private hand: Hand,
    private player: Player,
    private card: Card,
  ) {}

  public execute(): void {
    if (this.hand.phase != 'TRUCO') {
      throw Error(`Cannot play a card during ${this.hand.phase}!`);
    }

    if (this.hand.turns.playCardTurn != this.player) {
      throw Error(`${this.player.id} is not your turn!`);
    }

    const currentRound = this.hand.rounds[this.hand.currentRound];
    currentRound.playCard(this.player, this.card);

    this.hand.turns.nextTurn();

    // TODO:
    // what happens if the card played ends the round/hand?
  }
}

export interface Command {
  execute(): void;
}
