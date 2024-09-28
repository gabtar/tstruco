export interface GameRules {
  numberOfPlayers: number;
  maxPoints: number;
  flor: boolean;
}

export interface ActionParams {
  playCard: { player: number; card: string };
  newGame: { rules: GameRules };
  newHand: {}
}
