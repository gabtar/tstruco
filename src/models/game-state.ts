import { GameRules } from '../types';
import { Hand } from './hand';

export class GameState {
  constructor(
    public hand: Hand,
    public score: number[],
    public rules: GameRules,
  ) {}
}
