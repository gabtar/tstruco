import { GameState } from '../models/game-state';
import { Score } from '../models/score';
import { GameRules } from '../types';
import { HandFactory } from './hand.factory';
import { PlayerFactory } from './player.factory';

export class GameStateFactory {
  /*
   * Returns a new GameState based on the rules passed
   */
  public static createGame(rules: GameRules): GameState {
    const players = PlayerFactory.createPlayers(rules.numberOfPlayers);
    const hand = HandFactory.createHand(players);
    const score = new Score();

    return new GameState(hand, rules, score);
  }
}
