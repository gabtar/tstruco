import { Deck } from '../models/deck';
import { Hand } from '../models/hand';
import { Player } from '../models/player';
import { RoundFactory } from './round.fatory';

export class HandFactory {
  /*
   * createPlayers creates the necesary players for a game of truco
   * NOTE: number of players shoud be 2, 4, or 6
   */
  public static createHand(players: Player[]): Hand {
    let rounds = RoundFactory.createRounds(players);

    // NOTE: Hand turns should be setted on the CreateNewHandCommand to set new hand player and dealer

    // TODO: check game phases and hand player / turns
    return new Hand(new Deck(), players, rounds, 0, 'TRUCO');
  }
}
