export interface GameRules {
  numberOfPlayers: number;
  maxPoints: number;
  flor: boolean;
}

export interface ActionParams {
  playCard: { player: number; cardCode: string };
  newGame: { rules: GameRules };
  newHand: {};
  chantEnvido: { player: number; chant: EnvidoLevel };
  respondEnvido: { player: number; accepted: boolean };
  playEnvido: { player: number; cardsCode: string[] };
}

export enum EnvidoLevel {
  Envido = 1,
  RealEnvido,
  FaltaEnvido,
}

export enum PlayerNumber {
  PlayerOne = 1,
  PlayerTwo,
  PlayerThree,
  PlayerFour,
  PlayerFive,
  PlayerSix,
}

export enum GamePhase {
  Truco = 'TRUCO', // Default phase. Play a card according to player turns
  ChantTruco = 'CHANT_TRUCO',
  ChantEnvido = 'CHANT_ENVIDO',
  PlayEnvido = 'PLAY_ENVIDO',
  Flor = 'FLOR',
  PlayFlor = 'PLAY_FLOR',
}
