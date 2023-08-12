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
    // Escenarios de ganador:
    // Gana 2 de 3 manos
    // Gana 1 cada uno y la otra parda -> define la primera mano
    // Empatan las 3 manos -> Gana el que es mano

    // Prueba caso 1
    //  cuento los ganadores de cada round
    // roundWinners es un array de Player[] por cada round
    // const roundWinners = this.rounds.map((round) => round.winner());

    const roundsWinnedByPlayer = this.rounds.reduce((roundsWinned, round) => {
      // If key exists +1, else create key
      round.winner()?.forEach( (winner) => {
        if (roundsWinned.has(winner)) {
          roundsWinned.set(winner, roundsWinned.get(winner) + 1)
        } else {
          roundsWinned.set(winner, 1)
        }
      });
      return roundsWinned
    }, new Map());

    roundsWinnedByPlayer.forEach( (wins, player) => { 
      if (wins == 2) {
        winner = player
      }
    });

    return winner 
  }
}
