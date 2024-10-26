import { EnvidoLevel } from '../types';
import { EnvidoPair } from './envido-pair';

export class Envido {
  constructor(
    private handPlayerOrder: number[],
    public cardsPlayed: Map<number, EnvidoPair> = new Map<number, EnvidoPair>(),
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
   * envidoPlaysCount
   * Returns the number of player who has played envido
   */
  get envidoPlaysCount(): number {
    return this.cardsPlayed.size;
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
      .filter(([k, v]) => v.score() == higestEnvidoPair.score())
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

  private isValidEnvidoLevel(chant: EnvidoLevel): boolean {
    return (
      this.chanted[this.chanted.length - 1] != EnvidoLevel.Envido &&
      chant < this.chanted[this.chanted.length - 1]
    );
  }
}
