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

describe('#serilize', () => {
  const score = new Score();

  it('Should return A0B0 when no team has score', () => {
    expect(score.serialize()).toBe("A0B0");
  });

  it('Should return A5B17 when Team A has 5 points and Team B has 17 points in the game', () => {
    score.add(Team.A, 5);
    score.add(Team.B, 17);

    expect(score.serialize()).toBe("A5B17");
  });
});
