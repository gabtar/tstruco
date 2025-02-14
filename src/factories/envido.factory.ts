import { Envido } from '../models/envido';
import { EnvidoPair } from '../models/envido-pair';
import { EnvidoLevel } from '../types';
import { CardFactory } from './card.factory';

export class EnvidoFactory {
  /*
   * Returns an Envido instance from the serialized code
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
