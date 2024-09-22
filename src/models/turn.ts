import { Player } from './player';

export class Turn {
  constructor(
    public players: Player[], // should be ordered in sequence of players for each team
    public chantEnvidoTurn: Player | null,
    public chantTrucoTurn: Player | null,
    public playCardTurn: Player | null,
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
    const currentIndex = this.players.indexOf(this.playCardTurn!);
    const nextPlayerIndex =
      currentIndex === this.players.length - 1 ? 0 : currentIndex + 1;

    this.chantEnvidoTurn = this.players[nextPlayerIndex];
    this.chantTrucoTurn = this.players[nextPlayerIndex];
    this.playCardTurn = this.players[nextPlayerIndex];
  }
}
