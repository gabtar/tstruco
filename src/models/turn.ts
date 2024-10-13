import { Player } from './player';

export class Turn {
  constructor(
    // TODO: keep track of the hand player
    public players: Player[], // should be ordered in sequence of players for each team
    // TODO: refactor remove nulleable (set a default value instead?)
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
    const randomIndex = Math.floor(Math.random() * this.players.length) + 1;

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
