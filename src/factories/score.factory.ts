import { Score } from '../models/score';
import { Team } from '../types';

export class ScoreFactory {
  public static from(serializedScore: string, maxScore: number): Score {
    const score = new Score(maxScore);
    const scores = serializedScore.match(/\d+/g)!;

    score.add(Team.A, +scores[0]);
    score.add(Team.B, +scores[1]);

    return score;
  }
}
