import { Card } from '../models/card';
import { Ranks, Suits } from '../types';

/**
 * A factory for creating Card objects
 *
 * @class CardFactory
 * @description Creates cards object for the spanish deck
 */
export class CardFactory {
  /**
   * Returns a new Card instance
   *
   * @static
   * @param {string} cardCode - The string code of the card in the form "ranksuit". Eg '1E' rank 1 suit 'espada'
   * @returns {Card} - The card object in the spanish deck for a game of Truco
   * @throws {Error} - If the suit or rank is invalid
   */
  public static from(cardCode: string): Card {
    const twoDigitsRank = cardCode.length > 2;
    const rank = twoDigitsRank ? cardCode.slice(0, 2) : cardCode[0];
    const suit = twoDigitsRank ? cardCode[2] : cardCode[1];

    if (!Ranks.includes(rank) || !Suits.includes(suit)) {
      throw Error('Invalid Card!');
    }

    return new Card(rank, suit);
  }
}
