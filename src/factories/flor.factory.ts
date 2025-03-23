import { Flor } from '../models/flor';
import { FlorLevel } from '../types';
import { CardFactory } from './card.factory';

/**
 * A factory for creating Flor objects
 *
 * @class FlorFactory
 * @description Creates Flor objects to manage the Flor play and chants during a hand of Truco
 */
export class FlorFactory {
  /**
   * Returns a new Flor instance from the serialized string code
   *
   * @static
   * @param {string} florSerializedCode - The Flor serialized string
   * @param {number} handPlayer - The starter player of the current Hand
   * @param {numberOfPlayers} numberOfPlayers - The total players of the hand
   * @returns {Flor} - The Flor instance according to the serialized flor string
   */
  public static from(
    florSerializedCode: string,
    handPlayer: number,
    numberOfPlayers: number,
  ): Flor {
    const handPlayerOrder = Array.from(
      { length: numberOfPlayers },
      (_, i) => (i + handPlayer) % numberOfPlayers,
    );
    const flor = new Flor(handPlayerOrder);

    if (!florSerializedCode) return flor;

    const segments = florSerializedCode.split('-');

    this.parseChants(segments[0], flor);
    this.parseCardsPlayed(segments.slice(1, -1), flor);

    return flor;
  }

  /**
   * Parses the Chants of a serialized Flor string
   *
   * @static
   * @param {string} chantSegment - The segment of the serialized Flor containing the chants so far
   * @param {Flor} flor - The Flor object to modify the chants according to the chantSegment
   */
  private static parseChants(chantSegment: string, flor: Flor): void {
    const florLevelsCode: Record<string, FlorLevel> = {
      F: FlorLevel.Flor,
      C: FlorLevel.ContraFlor,
      R: FlorLevel.ContraFlorAlResto,
    };

    chantSegment.split('').forEach((code) => {
      if (code === 'A') flor.accepted = true;
      else if (code === 'D') flor.accepted = false;
      else if (florLevelsCode[code] !== undefined)
        flor.chanted = florLevelsCode[code];
    });
  }

  /**
   * Parses the Cards played of a serialized Flor during an Flor Play
   *
   * @static
   * @parm {string[]} cardSegments - An array of cardCodes played during Flor
   * @param {Envido} flor - The Flor object to modify the cards played
   */
  private static parseCardsPlayed(
    cardsPlayedSegment: string[],
    flor: Flor,
  ): void {
    cardsPlayedSegment.forEach((segment) => {
      const match = segment.match(/^(\d)/);
      if (!match) return;

      const player = parseInt(match[0]);
      const cardCodes = segment.substring(1).match(/\d{1,2}[A-Z]/g);
      const cards = cardCodes!.map((cardCode) => CardFactory.from(cardCode));

      flor.playCards(player, cards);
    });
  }
}
