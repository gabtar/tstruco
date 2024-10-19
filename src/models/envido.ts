import { EnvidoLevel } from '../types';
import { EnvidoPair } from './envido-pair';

export class Envido {
  constructor(
    private handPlayerOrder: number[],
    public cardsPlayed: Map<number, EnvidoPair> = new Map<number, EnvidoPair>(),
    public chanted: EnvidoLevel[] = [],
    public accepted?: boolean,
  ) {}

  addChant(chant: EnvidoLevel) {
    if (this.isValidEnvidoLevel(chant)) {
      throw Error(`Cannot chant ${EnvidoLevel[chant]}!`);
    }

    this.chanted.push(chant);
  }

  /*
   * Play an envido pair for the player passed
   */
  playCards(playerNumber: number, envidoPair: EnvidoPair) {
    this.cardsPlayed.set(playerNumber, envidoPair);
  }

  /*
   * Returns the number of player who has played envido
   */
  get envidoPlaysCount(): number {
    return this.cardsPlayed.size;
  }

  /*
   * Returns an array with the ids of the winners of the envido. The player(s) who has the highest EnvidoPair score
   */
  winner(): number[] {
    const higestEnvidoPair = [...this.cardsPlayed.values()].reduce(
      (pair, current) => {
        return pair.score() > current.score() ? pair : current;
      },
    );

    return [...this.cardsPlayed.entries()]
      .filter(([k, v]) => v.score() == higestEnvidoPair.score())
      .map(([k]) => k);
  }

  private isValidEnvidoLevel(chant: EnvidoLevel): boolean {
    return (
      this.chanted[this.chanted.length - 1] != EnvidoLevel.Envido &&
      chant < this.chanted[this.chanted.length - 1]
    );
  }
}
