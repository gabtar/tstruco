import { Envido } from '../models/envido';
import { EnvidoPair } from '../models/envido-pair';
import { EnvidoLevel } from '../types';
import { CardFactory } from './card.factory';

/**
 * A factory for creating Envido objects
 *
 * @class EnvidoFactory
 * @description Creates Envido objects to manage the envido play and chants during a hand of Truco
 */
export class EnvidoFactory {
  /**
   * Returns a new Envido instance from the serialized string code
   *
   * @static
   * @param {string} envidoSerializedCode - The Envido serialized string
   * @param {number} handPlayer - The starter player of the current Hand
   * @param {numberOfPlayers} numberOfPlayers - The total players of the hand
   * @returns {Envido} - The Envido instance according to the status of the serialized code passed
   */
  public static from(
    envidoSerializedCode: string,
    handPlayer: number,
    numberOfPlayers: number,
  ): Envido {
    const handPlayerOrder = Array.from(
      { length: numberOfPlayers },
      (_, i) => (i + handPlayer) % numberOfPlayers,
    );
    const envido = new Envido(handPlayerOrder);

    if (!envidoSerializedCode) return envido;

    const segments = envidoSerializedCode.split('-');

    this.parseChants(segments[0], envido);
    this.parseCards(segments.slice(1, -1), envido);

    return envido;
  }

  /**
   * Parses the Chants of a serialized Envido string
   *
   * @static
   * @param {string} chantSegment - The segment of the serialized Envido containing the chants so far
   * @param {Envido} envido - The Envido object to modify the chants according to the chantSegment
   */
  private static parseChants(chantSegment: string, envido: Envido): void {
    const envidoLevelsCode: Record<string, EnvidoLevel> = {
      E: EnvidoLevel.Envido,
      R: EnvidoLevel.RealEnvido,
      F: EnvidoLevel.FaltaEnvido,
    };

    chantSegment.split('').forEach((code) => {
      if (code === 'A') envido.accepted = true;
      else if (code === 'D') envido.accepted = false;
      else if (envidoLevelsCode[code]) envido.addChant(envidoLevelsCode[code]);
    });
  }

  /**
   * Parses the Cards played of a serialized Envido during an Envido Play
   *
   * @static
   * @parm {string[]} cardSegments - An array of cardCodes played during envido
   * @param {Envido} envido - The Envido object to modify the cards played
   */
  private static parseCards(cardSegments: string[], envido: Envido): void {
    cardSegments.forEach((segment) => {
      const match = segment.match(/^(\d)/);
      if (!match) return;

      const player = parseInt(match[0]);
      const cardCodes = segment.substring(1).match(/\d{1,2}[A-Z]/g);
      const cards = cardCodes!.map((cardCode) => CardFactory.from(cardCode));
      const cardTwo = cards.length === 1 ? undefined : cards[1];

      envido.playCards(player, new EnvidoPair(cards[0], cardTwo));
    });
  }
}
