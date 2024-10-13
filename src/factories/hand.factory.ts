import { Deck } from '../models/deck';
import { Envido } from '../models/envido';
import { Hand } from '../models/hand';
import { Player } from '../models/player';
import { Turn } from '../models/turn';
import { RoundFactory } from './round.fatory';

export class HandFactory {
  /*
   * createPlayers creates the necesary players for a game of truco
   * NOTE: number of players shoud be 2, 4, or 6
   */
  public static createHand(players: Player[]): Hand {
    const rounds = RoundFactory.createRounds(players);

    // NOTE: Hand turns should be setted on the CreateNewHandCommand to set new hand player and dealer
    const turns = new Turn(players);
    const envido = new Envido();

    return new Hand(new Deck(), players, rounds, envido, turns, 0, 'TRUCO');
  }
}
