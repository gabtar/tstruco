import { Score } from "./score";

describe('#add', () => {
  const score = new Score();

  it('Should add 5 points to A team', () => {
    score.add('A', 5);

    expect(score.getScore('A')).toBe(5);
  });

});

