import { EnvidoPairFactory } from '../factories/envido-pair.factory';
import { Card } from '../models/card';
import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { Team } from '../types';
import { Command } from './play-card-command';

export class PlayEnvidoCommand implements Command {
  constructor(
    private state: GameState,
    private player: Player,
    private cards: Card[],
  ) {}

  public execute(): GameState {
    this.cards.forEach((card) => {
      if (!this.player.cards.includes(card)) {
        throw new Error(`You dont have a ${card} card`);
      }
    });

    if (this.state.hand.turns.chantEnvidoTurn != this.player) {
      throw new Error(`${this.player.id} is not your turn!`);
    }

    const cardOne = this.cards[0];
    let cardTwo = undefined;

    if (this.cards.length > 1) {
      cardTwo = this.cards[1];
    }

    this.state.hand.envido.playCards(
      this.player.id,
      EnvidoPairFactory.createEnvidoPair(cardOne, cardTwo),
    );
    this.state.hand.turns.updateChantEnvidoTurn();

    if (
      this.state.hand.envido.envidoPlaysCount ==
      this.state.rules.numberOfPlayers
    ) {
      const envidoPoints = this.state.hand.envido.totalScorePoints();
      const winner = this.state.hand.envido.winner();

      const team = winner % 2 == 0 ? Team.A : Team.B;

      this.state.score.add(team, envidoPoints);

      // TODO: reset turns...
    }

    return this.state;
  }
}
