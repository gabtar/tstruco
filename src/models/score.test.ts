import { Team } from '../types';
import { Score } from './score';

describe('#add', () => {
  const score = new Score();

  it('Should add 5 points to A team', () => {
    score.add(Team.A, 5);

    expect(score.getScore(Team.A)).toBe(5);
  });
});

describe('#maxScore', () => {
  const score = new Score();

  it('Return the score of Team B if it has more points than A team', () => {
    score.add(Team.A, 5);
    score.add(Team.B, 15);

    expect(score.maxScore()).toBe(15);
  });
});
