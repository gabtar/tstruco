import { FlorLevel, PlayerNumber } from '../types';
import { Card } from './card';

/**
 * Represents a play of Flor during a hand
 * 
 * @class Flor
 * @description A class that handles the Flor stage of a hand of Truco
 */
export class Flor {

  /**
   * An array containing the Flor level score based on the level chanted
   * 
   * @readonly
   * @type {numer[]}
   */
  private readonly flowerScore = [4, 6, 30, 3, 4, 6]; // Accepted: 4 6 30 Declined: 3 4 6

  /**
   * Creates a new Flor instance
   *
   * @param {number[]} handPlayerOrder - The order of the players in the hand starting from the hand player
   * @param {Map<PlayerNumber, Card[]>} cardsPlayed - A map with the cards played by each player during the flor
   * @param {FlorLevel} chanted - Optional chanted flor level in the hand 
   * @param {boolean} accepted - If the flor was accepted or not by the opponent
   */
  constructor(
    private handPlayerOrder: number[],
    public cardsPlayed: Map<PlayerNumber, Card[]> = new Map<
      PlayerNumber,
      Card[]
    >(),
    public chanted?: FlorLevel,
    public accepted?: boolean,
  ) { }

  /**
   * Chants a flor level in the hand
   *
   * @param {FlorLevel} chant - The level to be chanted
   * @throws {Error} - If chant level is lower than current chanted level
   */
  chant(chant: FlorLevel) {
    if (this.chanted !== undefined && chant <= this.chanted) {
      throw new Error('Invalid chant');
    }

    this.chanted = chant;
  }

  /**
   * Returns the numbers of plays so far
   *
   * @returns {number} - The total number of players who have played the flor so far
   */
  get florPlaysCount(): number {
    return this.cardsPlayed.size;
  }

  /**
   * Plays the cards passed in the Flor
   *
   * @param {PlayerNumber} player - The number of the player who is playing the Flor
   * @param {Card[]} cards - The cards to be played
   * @throws {Error} - When the number of cards played is not equal to 3
   */
  playCards(player: PlayerNumber, cards: Card[]): void {
    if (cards.length !== 3) {
      throw new Error('Invalid cards');
    }

    this.cardsPlayed.set(player, cards);
  }

  /**
   * Returns the total score points in the flor based on the chants
   *
   * @returns {number} - The points to score when winning the flor
   */
  totalScorePoints(): number {
    return this.accepted
      ? this.flowerScore[this.chanted!]
      : this.flowerScore[this.chanted! + 3];
  }

  /**
   * Returns the winner of the flor
   * 
   * @returns {number} - The number of the player who won the flor
   */
  winner(): number {
    let maxScoreCount = 0,
      maxScore = 0;
    let winners: PlayerNumber[] = [];
    const flowerScores = new Map<PlayerNumber, number>();

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

  /**
   * Returns the encoded string for the current flor
   *
   * @returns {string} - The string code of the current flor play
   */
  public serialize(): string {
    const chantedCode = {
      0: 'F',
      1: 'C',
      2: 'R',
    };
    const chanted = this.chanted !== undefined ? chantedCode[this.chanted] : '';
    const accepted =
      this.accepted !== undefined ? (this.accepted ? 'A' : 'D') : '';
    let cardsPlayed = '';

    this.cardsPlayed.forEach(
      (c, p) =>
      (cardsPlayed = cardsPlayed.concat(
        '-' + p + c.map((c) => c.toString()).join(''),
      )),
    );

    const isFinished = this.handPlayerOrder.length === this.cardsPlayed.size;
    const winner = chanted ? '-' + (isFinished ? this.winner() : 'N') : 'N';

    return chanted + accepted + cardsPlayed + winner;
  }

  /*
   * Returns the flor score of the player passed
   *
   * @private
   * @param {PlayerNumber} player - The number of the player to calculate the score of the flor
   * @returns {number} - The total score of the player according to the cards played on the flor
   */
  private score(player: PlayerNumber): number {
    return this.cardsPlayed.get(player)!.reduce((total, current) => {
      const cardScore = +current.rank > 7 ? 0 : +current.rank;
      return total + cardScore;
    }, 20);
  }
}
