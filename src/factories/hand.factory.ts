import { Deck } from '../models/deck';
import { Envido } from '../models/envido';
import { Flor } from '../models/flor';
import { Hand } from '../models/hand';
import { Player } from '../models/player';
import { Turn } from '../models/turn';
import { HandPhase, TrucoLevel } from '../types';
import { EnvidoFactory } from './envido.factory';
import { FlorFactory } from './flor.factory';
import { RoundFactory } from './round.fatory';
import { TurnFactory } from './turn.factory';

/**
 * A factory for creating Hand objects
 *
 * @class EnvidoFactory
 * @description Creates Envido objects to manage the envido play and chants during a hand of Truco
 */
export class HandFactory {
  public static gamePhaseCode: Record<string, HandPhase> = {
    T: HandPhase.PlayTruco,
    CT: HandPhase.ChantTruco,
    CE: HandPhase.ChantEnvido,
    PE: HandPhase.PlayEnvido,
    CF: HandPhase.ChantFlor,
    PF: HandPhase.PlayFlor,
  };

  /*
   * Returns a new Hand instance
   *
   * @static
   * @param {Player[]} players - The players of the hand
   * @pram {boolean} withFlor - Optional withFlor when the hand has Flor
   * @returns {Hand} - The new Hand instance
   */
  public static createHand(players: Player[], withFlor: boolean = false): Hand {
    const rounds = RoundFactory.createRounds(players);

    const turns = new Turn(players);
    turns.drawInitialTurns();

    const envido = new Envido(turns.handPlayerOrder());
    const flor = withFlor ? new Flor(turns.handPlayerOrder()) : undefined;

    return new Hand(
      new Deck(),
      players,
      rounds,
      envido,
      turns,
      HandPhase.PlayTruco,
      TrucoLevel.NotChanted,
      flor,
    );
  }

  /**
   * Returns a new Hand instance from the serialized strings codes
   *
   * @param {string} serializedCardsPlayed - The serialized string of the cards played during the Han
   * @param {string} serializedEnvido - The serialized string of the Envido played during the Hand
   * @param {string} serializedFlor - The serialized string of the Flor played during the Hand
   * @param {string} serializedTurns - The serialized string of the actual Turns in the hand
   * @param {string} serializedHandPhaseCode - The serialized string of the actual phase of the Hand
   * @param {string} serializedTrucoLevelCode - The serialized string of the current level of Truco in the hand
   * @param {Player[]} players - The players of the hand
   * @param {boolean} withFlor - If the hand has Flor or not
   * @returns {Hand} - The Hand based on the serialized strings passed
   */
  public static from(
    serializedCardsPlayed: string,
    serializedEnvido: string,
    serializedFlor: string,
    serializedTurns: string,
    serializedHandPhaseCode: string,
    serializedTrucoLevelCode: string,
    players: Player[],
    withFlor: boolean,
  ) {
    const rounds = RoundFactory.from(serializedCardsPlayed, players);
    const turns = TurnFactory.from(serializedTurns, players);
    const envido = EnvidoFactory.from(
      serializedEnvido,
      turns.handPlayer!.id,
      players.length,
    );
    const flor = withFlor
      ? FlorFactory.from(serializedFlor, turns.handPlayer!.id, players.length)
      : undefined;
    const gamePhase = this.gamePhaseCode[serializedHandPhaseCode];
    const trucoLevel = this.parseTrucoLevel(serializedTrucoLevelCode);

    return new Hand(
      new Deck(),
      players,
      rounds,
      envido,
      turns,
      gamePhase,
      trucoLevel,
      flor,
    );
  }

  /**
   * Parses the level of a serialized Truco string
   *
   * @static
   * @param {string} serializedTrucoLevel - The string representing the level of Truco chanted
   * @returns {TrucoLevel} - The level of Truco
   */
  private static parseTrucoLevel(serializedTrucoLevel: string): TrucoLevel {
    let trucoLevel = TrucoLevel.NotChanted;
    switch (serializedTrucoLevel) {
      case 'T':
        trucoLevel = TrucoLevel.Truco;
        break;
      case 'R':
        trucoLevel = TrucoLevel.Retruco;
        break;
      case 'V':
        trucoLevel = TrucoLevel.ValeCuatro;
        break;
    }

    return trucoLevel;
  }
}
