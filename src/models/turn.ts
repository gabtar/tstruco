import { PlayerNumber, Team } from '../types';
import { Player } from './player';

export class Turn {
  constructor(
    public players: Player[], // should be ordered in sequence of players for each team
    public handPlayer?: Player,
    public chantEnvidoTurn?: Player,
    public responseTrucoChantTurn?: Team,
    public responseFlorChantTurn?: Team,
    public playCardTurn?: Player,
    // Needed to keep track to whom return the original turns
    public firstEnvidoChant?: Player,
    public firstFlorChant?: Player,
    public atDeck: Player[] = [], // players already resigned to current hand
  ) { }

  /*
   * Draws the initial turns for a new hand
   */
  public drawInitialTurns(): void {
    const randomIndex = Math.floor(Math.random() * this.players.length);

    this.handPlayer = this.players[randomIndex];
    this.chantEnvidoTurn = this.players[randomIndex];
    this.playCardTurn = this.players[randomIndex];
  }

  /*
   * setTurns
   * Updates all the current turs to the player passed
   */
  public setTurns(player: Player) {
    this.chantEnvidoTurn = player;
    this.playCardTurn = player;
  }

  /*
   * Advances to next player when a card is played during a hand
   */
  public nextTurn(): void {
    const nextPlayerIndex = this.nextPlayCardPlayer();

    this.setTurns(this.players[nextPlayerIndex]);
  }

  /*
   * Returns an array with the order of the handPlayer to the rest for envido
   */
  public handPlayerOrder(): number[] {
    const totalPlayers = this.players.length;
    const initialPlayerNumber = this.handPlayer!.id;

    return Array.from(
      { length: totalPlayers - initialPlayerNumber },
      (_, i) => initialPlayerNumber + i,
    ).concat(...Array(initialPlayerNumber).keys());
  }

  /*
   * goToDeck
   * Removes a player from the player's list and sends him to deck
   */
  public goToDeck(playerNumber: PlayerNumber) {
    const playerToDeck = this.players.find((p) => p.id === playerNumber);

    this.atDeck.push(playerToDeck!);
    this.players = this.players.filter((p) => p.id !== playerNumber);
  }

  /*
   * teamAtDeck
   * Returns whenever a team is at deck or undefined
   */
  public teamAtDeck(): Team | undefined {
    const team = this.players[0].team;

    if (this.players.every((player) => player.team === team)) {
      return team === Team.A ? Team.B : Team.A;
    }

    return undefined;
  }

  /*
   * Updates chant envido turn to next player
   */
  public updateChantEnvidoTurn(): void {
    this.chantEnvidoTurn = this.players[this.nextChantEnvidoPlayer()];
  }

  /*
   * serialize
   * Returns the encoded string of the current turns in the hand
   */
  public serialize(): string {
    let s = '';
    s += this.handPlayer !== undefined ? 'H' + this.handPlayer.id : '-';
    s += this.chantEnvidoTurn !== undefined ? 'C' + this.chantEnvidoTurn.id : '-';
    s += this.responseTrucoChantTurn !== undefined ? 'T' + this.responseTrucoChantTurn : '-';
    s += this.responseFlorChantTurn !== undefined ? 'F' + this.responseFlorChantTurn : '-';
    s += this.playCardTurn !== undefined ? 'P' + this.playCardTurn.id : '-';
    s += this.firstEnvidoChant !== undefined ? 'Y' + this.firstEnvidoChant.id : '-';
    s += this.firstFlorChant !== undefined ? 'Z' + this.firstFlorChant.id : '-';
    s +=
      this.atDeck.length > 0
        ? 'D' + this.atDeck.map((p) => p.id).join('')
        : '-';

    return s;
  }

  private nextPlayCardPlayer(): number {
    const currentIndex = this.playCardTurn?.id ?? 0;
    return currentIndex === this.players.length - 1 ? 0 : currentIndex + 1;
  }

  private nextChantEnvidoPlayer(): number {
    const currentIndex = this.chantEnvidoTurn?.id ?? 0;
    return currentIndex === this.players.length - 1 ? 0 : currentIndex + 1;
  }
}
