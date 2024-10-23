import { GameRules } from '../types';
import { Hand } from './hand';
import { Score } from './score';

export class GameState {
  constructor(
    public hand: Hand,
    public rules: GameRules,
    public score: Score
  ) { }
}
