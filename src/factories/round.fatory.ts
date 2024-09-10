import { Card } from '../models/card';
import { Player } from '../models/player';
import { Round } from '../models/round';

export class RoundFactory {
  /*
   * createRound creates the round for the players
   */
  public static createRounds(players: Player[]): Round[] {
    return [
      new Round(new Map<Player, Card>(), players),
      new Round(new Map<Player, Card>(), players),
      new Round(new Map<Player, Card>(), players),
    ];
  }
}
