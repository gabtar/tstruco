import { Flor } from '../models/flor';
import { FlorLevel } from '../types';
import { CardFactory } from './card.factory';

export class FlorFactory {
  /*
   * Returns an Flor instance from the serialized flor passed
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

  private static parseChants(chantSegment: string, flor: Flor): void {
    const florLevelsCode: Record<string, FlorLevel> = {
      F: FlorLevel.Flor,
      C: FlorLevel.ContraFlor,
      R: FlorLevel.ContraFlorAlResto,
    };

    chantSegment.split('').forEach((code) => {
      if (code === 'A') flor.accepted = true;
      else if (code === 'D') flor.accepted = false;
      else if (florLevelsCode[code]) flor.chanted = florLevelsCode[code];
    });
  }

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
