export type Action = 'PLAY_CARD' | 'CHANT_ENVIDO';

// export type NumberOfPlayers = 2 | 4 | 6;

// export type MaxPoints = 15 | 30;

export interface GameRules {
  numberOfPlayers: number;
  maxPoints: number;
  flor: boolean;
}

export interface ActionRequest {
  player: number; // 0 - 6 player number on the player list
  card?: string; // card to be played in the form 1E
  envidoLevel?: string;
  gameRules: GameRules;
}
