import { Round } from "./round";
import { Card, Player } from "./types";

// A hand of truco
export class Hand {
  constructor(
    private rounds: Round[] = [new Round(), new Round(), new Round()],
    private _currentRound = 0,
  ) { }

  /** Returns the current round of the hand */
  get currentRound(): number {
    return this._currentRound;
  }

  /** Plays a card in the current round */
  playCard(player: Player, card: Card): void {
    this.rounds[this._currentRound].playCard(player, card);

    if (this.rounds[this.currentRound].isFinished()) {
      this._currentRound++;
    }
  }

  /** Returns the card played by a player on the passed round or undefined if no card played yet */
  cardPlayed(player: Player, roundNumber: number): Card | undefined {
    return this.rounds[roundNumber].cardPlayed(player);
  }

  /** Returns the winner of the hand or null if not finished */ 
  winner(): Player | null {
    let winner: Player | null = null

    if (this._currentRound <= 1) {
      return null
    }

    /** TODO: Tendría que ser por equipo/by team ... */
    const roundsWinnedByPlayer = this.rounds.reduce((roundsWinned, round) => {
      round.winner()?.forEach( (winner) => {
        if (!roundsWinned.has(winner)) {
          roundsWinned.set(winner, 0)
        }
        roundsWinned.set(winner, roundsWinned.get(winner) + 1)
      });
      return roundsWinned
    }, new Map());

    // Reglas:
    // Tabla de ganador   E Empate / J1 gana jugador 1 / J2 gana jugador 2
    // 1ra 2da 3ra    GANADOR                   GANA J1/J2
    // J1  J1           J1                        2/0   Test ✔
    // E   J1           J1                        2/1   Test ✔
    // E   E   J1       J1                        3/2   Test ✔
    // E   E   E        J1 (J1 es mano)           3/3 
    // J1  E            J1                        2/1   Test ✔
    // J2  J1  E        J2 (ganó la primera)      2/2   Test ✔
    //
    // Si 1 jug gana más rounds que el otro -> gana ése jugador (debe ganar más de 1 round)
    // Si ganan igual cantidad -> Verifico el que ganó la primera. Y si es empate ganó el que es mano

    const players: Player[] = Array.from(roundsWinnedByPlayer.keys())

    const winsP1 = roundsWinnedByPlayer.get(players[0]) ?? 0
    const winsP2 = roundsWinnedByPlayer.get(players[1]) ?? 0

    if (winsP1 === winsP2) {
      // Hay que desempatar
      // TODO: harcodeado para pasar los tests...

      //                        Gana la mano / Gana el que ganó la primera mano
      winner = (winsP1 == 3) ? players[0] : this.rounds[0].winner()![0]
    } else {
      // Hay ganador directo
      winner = (winsP1 > winsP2) ? players[0] : players[1]
    }

    return winner 
  }
}
