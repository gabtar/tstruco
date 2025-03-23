import { Team } from '../types';
import { ScoreFactory } from './score.factory';

describe('#from', () => {
  it('Should return an score with 0 points for each team when A0B0 is deserialized', () => {
    const score = ScoreFactory.from('A0B0', 15);

    expect(score.getScore(Team.A)).toBe(0);
    expect(score.getScore(Team.B)).toBe(0);
  });

  it('Should return an score of 15 points for Team A and 20 for Team B when A15B20 is deserialized', () => {
    const score = ScoreFactory.from('A15B20', 15);

    expect(score.getScore(Team.A)).toBe(15);
    expect(score.getScore(Team.B)).toBe(20);
  });
});
