import { Card } from '../models/card';

export class CardFactory {
  /*
   * from returns a card object from a card code string
   */
  public static from(cardCode: string): Card {
    // if (cardCode[0] in Suits === false || cardCode[1] in Ranks === false) {
    //   throw Error('Invalid Card!');
    // }
    if (cardCode.length > 2) {
      return new Card(cardCode.substring(0, 2), cardCode[2]);
    }

    return new Card(cardCode[0], cardCode[1]);
  }
}
