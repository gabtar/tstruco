import { EnvidoLevel, PlayerNumber } from '../types';
import { EnvidoPair } from './envido-pair';

export class Envido {
  constructor(
    private handPlayerOrder: number[],
    public cardsPlayed: Map<PlayerNumber, EnvidoPair> = new Map<
      PlayerNumber,
      EnvidoPair
    >(),
    public chanted: EnvidoLevel[] = [],
    public accepted?: boolean,
  ) {}

  /*
   * addChant
   * Adds the passed chant to the envido
   */
  addChant(chant: EnvidoLevel) {
    if (this.isValidEnvidoLevel(chant)) {
      throw Error(`Cannot chant ${EnvidoLevel[chant]}!`);
    }

    this.chanted.push(chant);
  }

  /*
   * playCards
   * Play an envido pair for the player passed
   */
  playCards(playerNumber: number, envidoPair: EnvidoPair) {
    this.cardsPlayed.set(playerNumber, envidoPair);
  }

  /*
   * allPlayersPlayed
   * Returns if all the players have played the envido play
   */
  get allPlayersPlayed(): boolean {
    return this.cardsPlayed.size === this.handPlayerOrder.length;
  }

  /*
   * winner
   * Returns the id of the winner of the Envido play
   */
  winner(): number {
    const higestEnvidoPair = [...this.cardsPlayed.values()].reduce(
      (pair, current) => {
        return pair.score() > current.score() ? pair : current;
      },
    );

    const winners = [...this.cardsPlayed.entries()]
      .filter(([_, v]) => v.score() == higestEnvidoPair.score())
      .map(([k]) => k);

    if (winners.length > 0) {
      winners.sort(
        (a, b) =>
          this.handPlayerOrder.indexOf(a) - this.handPlayerOrder.indexOf(b),
      );
    }

    return winners[0];
  }

  /*
   * totalScorePoints
   * Returns the total score points for envido based on the chants and if it was accepted or declined
   */
  totalScorePoints(): number {
    let score = this.chanted.reduce((total, current) => total + current);
    if (!this.accepted) {
      score -= this.chanted[this.chanted.length - 1];
      score += 1;
    }
    return score;
  }

  /*
   * serialize
   * Returns the string code representing the status of the envido
   */
  public serialize(): string {
    const chantedCode = {
      2: 'E',
      3: 'R',
      30: 'F',
    };
    const chanted = this.chanted.reduce(
      (chanted, chant) => chanted + chantedCode[chant],
      '',
    );
    const accepted =
      this.accepted !== undefined ? (this.accepted ? 'A' : 'D') : '';

    if (!accepted) {
      return chanted;
    }

    let cardsPlayed = '';
    this.cardsPlayed.forEach(
      (ep, p) => (cardsPlayed = cardsPlayed.concat(p + ep.serialize() + '-')),
    );
    const winner = this.allPlayersPlayed ? this.winner() : 'N';

    if (!cardsPlayed) {
      return chanted + accepted;
    }

    return chanted + accepted + '-' + cardsPlayed.slice(0, -1) + '-' + winner;
  }

  private isValidEnvidoLevel(chant: EnvidoLevel): boolean {
    return (
      this.chanted[this.chanted.length - 1] != EnvidoLevel.Envido &&
      chant < this.chanted[this.chanted.length - 1]
    );
  }
}
