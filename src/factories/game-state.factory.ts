import { GameState } from '../models/game-state';
import { Score } from '../models/score';
import { GameRules } from '../types';
import { HandFactory } from './hand.factory';
import { PlayerFactory } from './player.factory';
import { RulesFactory } from './rules.factory';
import { ScoreFactory } from './score.factory';

export class GameStateFactory {
  /*
   * Returns a new GameState based on the rules passed
   */
  public static createGame(rules: GameRules): GameState {
    const players = PlayerFactory.createPlayers(rules.numberOfPlayers);
    const hand = HandFactory.createHand(players, rules.flor);
    const score = new Score(rules.maxPoints);

    return new GameState(hand, rules, score);
  }

  public static from(serializedGame: string): GameState {
    const serializedParts = serializedGame.split('#');

    const rules = RulesFactory.from(serializedParts[0], serializedParts[1]);
    const players = PlayerFactory.from(
      rules.numberOfPlayers,
      serializedParts[2],
    );
    const hand = HandFactory.from(
      serializedParts[6],
      serializedParts[3],
      serializedParts[4],
      serializedParts[7],
      serializedParts[9],
      serializedParts[5],
      players,
      rules.flor,
    );
    const score = ScoreFactory.from(serializedParts[8], rules.maxPoints);

    return new GameState(hand, rules, score);
  }
}
