import { EnvidoLevel, PlayerNumber } from '../types';
import { EnvidoPair } from './envido-pair';

/**
 * Represents an envido instance during a hand of Truco
 *
 * @class Envido
 * @description A class to manage the envido play during a hand of Truco
 */
export class Envido {
  /**
   * Creates a new instance of Envido
   *
   * @param {number[]} handPlayerOrder - The order of the players during the hand starting from the hand player
   * @param {Map<PlayerNumber, EnvidoPair>} cardsPlayed - Holds the plays of envido by the players during the hand
   * @param {EnvidoLevel[]} chanted - The level(s) of envido chanted so far during the hand
   * @param {boolean} accepted - Optional
   */
  constructor(
    private handPlayerOrder: number[],
    public cardsPlayed: Map<PlayerNumber, EnvidoPair> = new Map<
      PlayerNumber,
      EnvidoPair
    >(),
    public chanted: EnvidoLevel[] = [],
    public accepted?: boolean,
  ) {}

  /**
   * Adds the passed chant level to the ones chanted so far
   *
   * @param {EnvidoLevel} chant - The level of envido to chant
   * @throws {Error} - It the chant level is invalid
   */
  public addChant(chant: EnvidoLevel) {
    if (this.isValidEnvidoLevel(chant)) {
      throw Error(`Cannot chant ${EnvidoLevel[chant]}!`);
    }

    this.chanted.push(chant);
  }

  /**
   * Plays an envido pair for the player passed
   *
   * @param {PlayerNumber} player - The number of the player who plays the envido pair
   * @param {EvidoPair} envidoPair - The envido pair with the card(s) to be played
   */
  public playCards(player: PlayerNumber, envidoPair: EnvidoPair) {
    this.cardsPlayed.set(player, envidoPair);
  }

  /**
   * Returns if all the players have played the envido play
   *
   * @get
   * @returns {boolean} - If all players of the hand have played the envido
   */
  get allPlayersPlayed(): boolean {
    return this.cardsPlayed.size === this.handPlayerOrder.length;
  }

  /**
   * Returns the id of the winner of the Envido play
   *
   * @returns {number} - The number of the player who won the envido
   */
  public winner(): number {
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

  /**
   * Returns the total score points for envido based on the chants and if it was accepted or declined
   *
   * @returns {number} - The score points to be earned by the player who won the envido
   */
  public totalScorePoints(): number {
    let score = this.chanted.reduce((total, current) => total + current);
    if (!this.accepted) {
      score -= this.chanted[this.chanted.length - 1];
      score += 1;
    }
    return score;
  }

  /**
   * Returns the string code representing the status of the envido
   *
   * @returns {string} - The encoded string representing current envido status
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

    if (!chanted) {
      return 'N';
    }

    const accepted =
      this.accepted !== undefined ? (this.accepted ? 'A' : 'D') : '';

    if (!accepted) {
      return chanted + '-N';
    }

    let cardsPlayed = '';
    this.cardsPlayed.forEach(
      (ep, p) => (cardsPlayed = cardsPlayed.concat(p + ep.serialize() + '-')),
    );
    const winner = this.allPlayersPlayed ? this.winner() : 'N';

    if (!cardsPlayed) {
      return chanted + accepted + '-N';
    }

    return chanted + accepted + '-' + cardsPlayed.slice(0, -1) + '-' + winner;
  }

  /**
   * Returns if the level passed is a valid chant
   *
   * @param {EnvidoLevel} chant - The envido level to evaluate if its valid
   * @returns {boolean} - If the chant is valid in the current envido state of the hand
   */
  private isValidEnvidoLevel(chant: EnvidoLevel): boolean {
    return (
      this.chanted[this.chanted.length - 1] != EnvidoLevel.Envido &&
      chant < this.chanted[this.chanted.length - 1]
    );
  }
}
