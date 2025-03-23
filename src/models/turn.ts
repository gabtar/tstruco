import { PlayerNumber, Team } from '../types';
import { Player } from './player';

/**
 * Represents the current turns of a Hand during the game of Truco
 *
 * @class Turns
 * @description A class that stores the information about the turns of the diferent plays of a hand of Truco
 */
export class Turn {
  /**
   * Creates a new Turn instance
   *
   * @param {Player[]} players - The players of the hand in ascending order
   * @param {handPlayer} handPlayer - Optional handPlayer the starting player of the Hand
   * @param {Team} chantEnvidoTurn - Optional team who has the turn to chant the envido play
   * @param {Team} responseTrucoChantTurn - Optional team who has the turn to respond the current Truco chant
   * @param {Team} responseFlorChantTurn - Optional team who has the turn to respond the Flor
   * @param {Player} playCardTurn - Optional player who has the turn to play a card
   * @param {Player} firstEnvidoChant - Optional player who first chant the envido play, so as to return the turn when accepted
   * @param {Player} firstFlorChant - Optional player who first chant the flor play
   * @param {Player[]} atDeck - The list of players who already resigned the hand
   */
  constructor(
    public players: Player[],
    public handPlayer?: Player,
    public chantEnvidoTurn?: Player,
    public responseTrucoChantTurn?: Team,
    public responseFlorChantTurn?: Team,
    public playCardTurn?: Player,
    public firstEnvidoChant?: Player,
    public firstFlorChant?: Player,
    public atDeck: Player[] = [],
  ) {}

  /**
   * Draws the initial turns for a new hand
   */
  public drawInitialTurns(): void {
    const randomIndex = Math.floor(Math.random() * this.players.length);

    this.handPlayer = this.players[randomIndex];
    this.chantEnvidoTurn = this.players[randomIndex];
    this.playCardTurn = this.players[randomIndex];
  }

  /**
   * Updates chant envido and play card turns to the player passed
   *
   * @param {Player} player - The player to update the turns
   */
  public setTurns(player: Player) {
    this.chantEnvidoTurn = player;
    this.playCardTurn = player;
  }

  /**
   * Advances to next player when a card is played during a hand
   */
  public nextTurn(): void {
    const nextPlayerIndex = this.nextPlayCardPlayer();

    this.setTurns(this.players[nextPlayerIndex]);
  }

  /**
   * Returns an array with the order of the handPlayer to the rest for envido
   *
   * @returns {number[]} - An array with the players number starting from the hand player to the last player
   */
  public handPlayerOrder(): number[] {
    const totalPlayers = this.players.length;
    const initialPlayerNumber = this.handPlayer!.id;

    return Array.from(
      { length: totalPlayers - initialPlayerNumber },
      (_, i) => initialPlayerNumber + i,
    ).concat(...Array(initialPlayerNumber).keys());
  }

  /**
   * Removes a player from the player's list and sends him to deck, and updates the turns
   */
  public goToDeck(playerNumber: PlayerNumber): void {
    const playerToDeck = this.players.find((p) => p.id === playerNumber);

    if (playerToDeck === this.chantEnvidoTurn) {
      this.updateChantEnvidoTurn();
    }

    if (playerToDeck === this.playCardTurn) {
      this.nextTurn();
    }

    this.atDeck.push(playerToDeck!);
    this.players = this.players.filter((p) => p.id !== playerNumber);
  }

  /**
   * Returns whenever a team is at deck or undefined if no team at deck
   *
   * @returns {Team|undefined} - The Team whose all players have resigned or undefined if not all players at deck yet
   */
  public teamAtDeck(): Team | undefined {
    const team = this.players[0].team;

    if (this.players.every((player) => player.team === team)) {
      return team === Team.A ? Team.B : Team.A;
    }

    return undefined;
  }

  /**
   * Updates chant envido turn to next player
   */
  public updateChantEnvidoTurn(): void {
    this.chantEnvidoTurn = this.players[this.nextChantEnvidoPlayer()];
  }

  /*
   * Returns the encoded string of the current turns in the hand
   *
   * @returns {string} - The string with the current state of the turns in the hand
   */
  public serialize(): string {
    let s = '';
    s += this.handPlayer !== undefined ? 'H' + this.handPlayer.id : '-';
    s +=
      this.chantEnvidoTurn !== undefined ? 'C' + this.chantEnvidoTurn.id : '-';
    s +=
      this.responseTrucoChantTurn !== undefined
        ? 'T' + this.responseTrucoChantTurn
        : '-';
    s +=
      this.responseFlorChantTurn !== undefined
        ? 'F' + this.responseFlorChantTurn
        : '-';
    s += this.playCardTurn !== undefined ? 'P' + this.playCardTurn.id : '-';
    s +=
      this.firstEnvidoChant !== undefined
        ? 'Y' + this.firstEnvidoChant.id
        : '-';
    s += this.firstFlorChant !== undefined ? 'Z' + this.firstFlorChant.id : '-';
    s +=
      this.atDeck.length > 0
        ? 'D' + this.atDeck.map((p) => p.id).join('')
        : '-';

    return s;
  }

  /**
   * Returns the number of the next player who has the turn to play a card
   *
   * @private
   * @returns {number} - The next player to play a card
   */
  private nextPlayCardPlayer(): number {
    const currentIndex = this.playCardTurn?.id ?? 0;
    return currentIndex === this.players.length - 1 ? 0 : currentIndex + 1;
  }

  /**
   * Returns the number of the next player for chant the envido
   *
   * @private
   * @returns {number} - The next player to chant the envido
   */
  private nextChantEnvidoPlayer(): number {
    const currentIndex = this.chantEnvidoTurn?.id ?? 0;
    return currentIndex === this.players.length - 1 ? 0 : currentIndex + 1;
  }
}
