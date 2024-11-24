import { Card } from '../models/card';
import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { GamePhase } from '../types';
import { Command } from './play-card-command';

export class PlayFlorCommand implements Command {
  constructor(
    private state: GameState,
    private player: Player,
    private cards: Card[],
  ) {}

  public execute(): GameState {
    // TODO: validations turns/cards/etc... player has the cards, etc
    this.state.hand.flor!.playCards(this.player.id, this.cards);

    // TODO: for now all players needs to play a flor to end the flor stage. This need to be fixed to only players who have a flower in his hand

    if (
      this.state.hand.flor!.florPlaysCount == this.state.rules.numberOfPlayers
    ) {
      const flowerPoints = this.state.hand.flor!.totalScorePoints();
      const winner = this.state.hand.flor!.winner();
      this.state.score.add(
        this.state.hand.getPlayer(winner).team,
        flowerPoints,
      );

      this.state.hand.phase = GamePhase.Truco;
    }

    return this.state;
  }
}
