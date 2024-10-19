import { Card } from '../models/card';
import { EnvidoPair } from '../models/envido-pair';

export class EnvidoPairFactory {
  /*
   * Creates a new envido pair with the cards passed
   */
  public static createEnvidoPair(cardOne: Card, cardTwo?: Card): EnvidoPair {
    return new EnvidoPair(cardOne, cardTwo);
  }
}
