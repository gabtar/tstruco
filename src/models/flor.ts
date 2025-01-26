import { FlorLevel, PlayerNumber } from '../types';
import { Card } from './card';

export class Flor {
  constructor(
    private handPlayerOrder: number[],
    private flowerScore = [4, 6, 30, 3, 4, 6], // Accepted: 4 6 30 Declined: 3 4 6
    public cardsPlayed: Map<PlayerNumber, Card[]> = new Map<
      PlayerNumber,
      Card[]
    >(),
    public chanted?: FlorLevel,
    public accepted?: boolean,
  ) { }

  /*
   * chant
   * sets the FlorLevel passed
   */
  chant(chant: FlorLevel) {
    if (this.chanted !== undefined && chant <= this.chanted) {
      throw new Error('Invalid chant');
    }

    this.chanted = chant;
  }

  /*
   * florPlaysCount
   * Returns the number of player who has played flower
   */
  get florPlaysCount(): number {
    return this.cardsPlayed.size;
  }

  /*
   * playCards
   * plays the cards passed in the Flor
   */
  playCards(player: PlayerNumber, cards: Card[]): void {
    if (cards.length !== 3) {
      throw new Error('Invalid cards');
    }

    this.cardsPlayed.set(player, cards);
  }

  /*
   * totalScorePoints
   * Returns the total score points in the flor
   */
  totalScorePoints(): number {
    return this.accepted
      ? this.flowerScore[this.chanted!]
      : this.flowerScore[this.chanted! + 3];
  }

  /*
   * winner
   * returns the winner of the flor
   */
  winner(): number {
    let maxScoreCount = 0,
      maxScore = 0;
    let winners: PlayerNumber[] = [];
    const flowerScores = new Map<PlayerNumber, number>();

    // TODO: extract to private method maybe calculateFlowerScores(?) and return the flowerScores Map
    [...this.cardsPlayed.keys()].forEach((player) => {
      const score = this.score(player);
      if (score >= maxScore) {
        const equalScore = score == maxScore;
        maxScoreCount = equalScore ? maxScoreCount + 1 : 1;
        winners = equalScore ? [...winners, player] : [player];
        maxScore = score;
      }
      flowerScores.set(player, score);
    });

    if (maxScoreCount > 1) {
      for (let i = 0; i <= this.handPlayerOrder.length; i++) {
        if (flowerScores.get(this.handPlayerOrder[i]) == maxScore) {
          winners[0] = this.handPlayerOrder[i];
          break;
        }
      }
    }

    return winners[0];
  }

  /*
   * serialize
   * Returns the encoded string for the current flor
   */
  public serialize(): string {
    const chantedCode = {
      0: "F",
      1: "C",
      2: "R",
    }
    const chanted = this.chanted !== undefined ? chantedCode[this.chanted] : "";
    const accepted = this.accepted !== undefined ? (this.accepted ? "A" : "D") : ""
    let cardsPlayed = "";
    this.cardsPlayed.forEach(
      (c, p) => cardsPlayed = cardsPlayed.concat(p + c.map(c => c.toString()).join(""))
    );

    return chanted + accepted + cardsPlayed;
  }

  /*
   * score
   * Returns the flor score of the player passed
   */
  private score(player: PlayerNumber): number {
    return this.cardsPlayed.get(player)!.reduce((total, current) => {
      const cardScore = +current.rank > 7 ? 0 : +current.rank;
      return total + cardScore;
    }, 20);
  }
}
