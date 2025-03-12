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
   * createPlayers creates the necesary players for a game of truco
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

  /*
   * returns a hand from a serialized string of cardcodes played
   */
  public static from(
    serializedCardsPlayed: string,
    serializedEnvido: string,
    serializedFlor: string,
    serializedTurns: string,
    serializedGamePhaseCode: string,
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
    const gamePhase = this.gamePhaseCode[serializedGamePhaseCode];
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
