export interface GameRules {
  numberOfPlayers: number;
  maxPoints: number;
  flor: boolean;
}

export interface ActionParams {
  playCard: { player: number; card: string };
  newGame: { rules: GameRules };
  newHand: {};
  chantEnvido: { player: number; chant: EnvidoLevel };
  respondEnvido: { player: number; accepted: boolean };
}

export enum EnvidoLevel {
  Envido = 1,
  RealEnvido,
  FaltaEnvido,
}

export enum GamePhase {
  Truco = 'TRUCO', // Default phase. Play a card according to player turns
  ChantTruco = 'CHANT_TRUCO',
  ChantEnvido = 'CHANT_ENVIDO',
  PlayEnvido = 'PLAY_ENVIDO',
  Flor = 'FLOR',
  PlayFlor = 'PLAY_FLOR',
}
