import { Card } from '../models/card';
import { EnvidoPair } from '../models/envido-pair';

/**
 * A factory for creating EnvidoPair objects
 *
 * @class EnvidoPairFactory
 * @description Creates EnvidoPair objects for playing during Envido
 */
export class EnvidoPairFactory {
  /*
   * Returns a new EnvidoPair instance
   *
   * @static
   * @param {Card} cardOne - The first card of the envido pair
   * @param {Card} cardTwo - Optional card of the envido pair
   * @returns {EnvidoPair} - The envido pair to be played in an envido play
   */
  public static createEnvidoPair(cardOne: Card, cardTwo?: Card): EnvidoPair {
    return new EnvidoPair(cardOne, cardTwo);
  }
}
