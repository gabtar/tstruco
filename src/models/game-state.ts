import { GameRules } from '../types';
import { Hand } from './hand';

export class GameState {
  constructor(
    public hand: Hand,
    public rules: GameRules,
    public score: Map<string, number> = new Map([
      ['A', 0],
      ['B', 0],
    ]),
  ) {}
}
