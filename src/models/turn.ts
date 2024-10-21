import { Player } from './player';

export class Turn {
  constructor(
    public players: Player[], // should be ordered in sequence of players for each team
    public handPlayer?: Player,
    public chantEnvidoTurn?: Player,
    public chantTrucoTurn?: Player,
    public playCardTurn?: Player,
    // Needed to keep track to whom return the original turns
    public firstEnvidoChant?: Player,
  ) {}

  /*
   * Draws the initial turns for a new hand
   */
  drawInitialTurns(): void {
    const randomIndex = Math.floor(Math.random() * this.players.length);

    this.handPlayer = this.players[randomIndex];
    this.chantEnvidoTurn = this.players[randomIndex];
    this.chantTrucoTurn = this.players[randomIndex];
    this.playCardTurn = this.players[randomIndex];
  }

  /*
   * Advances to next player when a card is played during a hand
   */
  nextTurn(): void {
    const nextPlayerIndex = this.nextPlayCardPlayer();

    this.chantEnvidoTurn = this.players[nextPlayerIndex];
    this.chantTrucoTurn = this.players[nextPlayerIndex];
    this.playCardTurn = this.players[nextPlayerIndex];
  }

  /*
   * Returns an array with the order of the handPlayer to the rest for envido
   */
  handPlayerOrder(): number[] {
    const totalPlayers = this.players.length;
    const initialPlayerNumber = this.handPlayer!.id;

    return Array.from(
      { length: totalPlayers - initialPlayerNumber },
      (_, i) => initialPlayerNumber + i,
    ).concat(...Array(initialPlayerNumber).keys());
  }

  /*
   * Updates chant envido turn to next player
   */
  updateChantEnvidoTurn() {
    this.chantEnvidoTurn = this.players[this.nextChantEnvidoPlayer()];
  }

  private nextPlayCardPlayer(): number {
    // TODO: fix this!...
    const currentIndex = this.playCardTurn?.id ?? 0;
    return currentIndex === this.players.length - 1 ? 0 : currentIndex + 1;
  }

  private nextChantEnvidoPlayer(): number {
    // TODO: fix this idem!...
    const currentIndex = this.chantEnvidoTurn?.id ?? 0;
    return currentIndex === this.players.length - 1 ? 0 : currentIndex + 1;
  }
}
