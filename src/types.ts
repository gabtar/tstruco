export interface GameRules {
  numberOfPlayers: number;
  maxPoints: number;
  flor: boolean;
}

export interface ActionParams {
  playCard: { player: PlayerNumber; cardCode: string };
  newGame: { rules: GameRules };
  newHand: {};
  chantEnvido: { player: PlayerNumber; chant: EnvidoLevel };
  respondEnvido: { player: PlayerNumber; accepted: boolean };
  playEnvido: { player: PlayerNumber; cardsCode: string[] };
  chantTruco: { player: PlayerNumber; trucoLevel: TrucoLevel };
  respondTruco: { player: PlayerNumber; accepted: boolean };
  chantFlor: { player: PlayerNumber; florLevel: FlorLevel };
}

export enum EnvidoLevel {
  Envido = 2,
  RealEnvido = 3,
  FaltaEnvido = 30, // TODO: check if rival has more or less of 15 score points...
}

export enum TrucoLevel {
  NotChanted = 1,
  Truco,
  Retruco,
  ValeCuatro,
}

export enum FlorLevel {
  Flor = 0,
  ContraFlorAlResto,
}

export enum Team {
  A = 0,
  B,
}

export enum PlayerNumber {
  PlayerOne = 0,
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
  ChantFlor = 'CHANT_FLOR',
  PlayFlor = 'PLAY_FLOR',
}

export enum Status {
  IN_PROGRESS = 'IN_PROGRESS',
  ENDED = 'ENDED',
}
