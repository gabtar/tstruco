import { Player } from '../models/player';
import { Turn } from '../models/turn';
import { Team } from '../types';

export class TurnFactory {
  public static from(serializedTurns: string, players: Player[]): Turn {
    const turnsCodes = {
      handPlayer: 'H',
      chantEnvido: 'C',
      chantTruco: 'T',
      chantFlor: 'F',
      playCard: 'P',
      firstEnvidoChant: 'Y',
      firstFlorChant: 'Z',
      atDeck: 'D',
    };

    const turn = new Turn(players);

    if (serializedTurns.includes(turnsCodes.handPlayer)) {
      const handPlayerIndex =
        +serializedTurns[serializedTurns.indexOf(turnsCodes.handPlayer) + 1];
      turn.handPlayer = players[handPlayerIndex];
    }

    if (serializedTurns.includes(turnsCodes.chantEnvido)) {
      const chantEnvidoIndex =
        +serializedTurns[serializedTurns.indexOf(turnsCodes.chantEnvido) + 1];
      turn.chantEnvidoTurn = players[chantEnvidoIndex];
    }

    if (serializedTurns.includes(turnsCodes.chantTruco)) {
      const chantTrucoCode =
        serializedTurns[serializedTurns.indexOf(turnsCodes.chantTruco) + 1];
      turn.responseTrucoChantTurn = +chantTrucoCode === 0 ? Team.A : Team.B;
    }

    if (serializedTurns.includes(turnsCodes.chantFlor)) {
      const chantFlorCode =
        serializedTurns[serializedTurns.indexOf(turnsCodes.chantFlor) + 1];
      turn.responseFlorChantTurn = +chantFlorCode === 0 ? Team.A : Team.B;
    }

    if (serializedTurns.includes(turnsCodes.playCard)) {
      const playCardIndex =
        +serializedTurns[serializedTurns.indexOf(turnsCodes.playCard) + 1];
      turn.playCardTurn = players[playCardIndex];
    }

    if (serializedTurns.includes(turnsCodes.firstEnvidoChant)) {
      const firstEnvidoChantIndex =
        +serializedTurns[
        serializedTurns.indexOf(turnsCodes.firstEnvidoChant) + 1
        ];
      turn.firstEnvidoChant = players[firstEnvidoChantIndex];
    }

    if (serializedTurns.includes(turnsCodes.firstFlorChant)) {
      const firstFlorChantIndex =
        +serializedTurns[
        serializedTurns.indexOf(turnsCodes.firstFlorChant) + 1
        ];
      turn.firstFlorChant = players[firstFlorChantIndex];
    }

    if (serializedTurns.includes(turnsCodes.atDeck)) {
      const atDeck = serializedTurns
        .slice(serializedTurns.indexOf(turnsCodes.atDeck) + 1)
        .split('');

      atDeck.forEach((p) => turn.atDeck.push(players[+p]));
    }

    return turn;
  }
}
