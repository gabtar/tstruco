import { GameState } from '../models/game-state';
import { Score } from '../models/score';
import { GameRules } from '../types';
import { HandFactory } from './hand.factory';
import { PlayerFactory } from './player.factory';
import { RulesFactory } from './rules.factory';
import { ScoreFactory } from './score.factory';

/**
 * A factory for creating GameState objects
 *
 * @class GameStateFactory
 * @description Creates GameState objects for handling games of Truco
 */
export class GameStateFactory {
  /**
   * Returns a new GameState instance according to the specific rules passed
   *
   * @param {GameRules} rules - The rules of a game of Truco
   * @returns {GameState} - The GameState object according to the rules
   */
  public static createGame(rules: GameRules): GameState {
    const players = PlayerFactory.createPlayers(rules.numberOfPlayers);
    const hand = HandFactory.createHand(players, rules.flor);
    const score = new Score(rules.maxPoints);

    return new GameState(hand, rules, score);
  }

  /**
   * Returns a new GameState instance from a serializedGame string
   *
   * @param {string} serializedGame - A serialized string from a previos GameState of Truco
   * @returns {GameState} - The GameState instance
   */
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
