import { Card } from '../models/card';
import { GameState } from '../models/game-state';
import { Player } from '../models/player';

export class PlayCardCommand implements Command {
  constructor(
    private state: GameState,
    private player: Player,
    private card: Card,
  ) { }

  public execute(): GameState {
    if (this.state.hand.phase != 'TRUCO') {
      throw Error(`Cannot play a card during ${this.state.hand.phase}!`);
    }

    if (this.state.hand.turns.playCardTurn != this.player) {
      throw Error(`${this.player.id} is not your turn!`);
    }

    if (this.alreadyPlayed(this.card)) {
      throw Error(`${this.card} was already played`);
    }

    let currentRound = this.state.hand.rounds[this.state.hand.currentRound];
    currentRound.playCard(this.player, this.card);

    this.state.hand.turns.nextTurn();

    // TODO:
    // what happens if the card played ends the round/hand?
    // maybe trigger an event to end the hand?

    return this.state;
  }

  private alreadyPlayed(card: Card): boolean {
    return this.state.hand.rounds.some(round =>
      Array.from(round.cardsPlayed.values()).includes(card)
    );
  }
}

export interface Command {
  execute(): GameState;
}

