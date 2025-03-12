import { Card } from '../models/card';
import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { HandPhase } from '../types';
import { Command } from './play-card-command';

export class PlayFlorCommand implements Command {
  constructor(
    private state: GameState,
    private player: Player,
    private cards: Card[],
  ) {}

  public execute(): GameState {
    this.state.hand.flor!.playCards(this.player.id, this.cards);

    if (
      this.state.hand.flor!.florPlaysCount == this.state.rules.numberOfPlayers
    ) {
      const flowerPoints = this.state.hand.flor!.totalScorePoints();
      const winner = this.state.hand.flor!.winner();
      this.state.score.add(
        this.state.hand.getPlayer(winner).team,
        flowerPoints,
      );

      this.state.hand.phase = HandPhase.PlayTruco;
    }

    return this.state;
  }
}
