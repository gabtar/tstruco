import { Team } from "../types";
import { Score } from "./score";

describe('#add', () => {
  const score = new Score();

  it('Should add 5 points to A team', () => {
    score.add(Team.A, 5);

    expect(score.getScore(Team.A)).toBe(5);
  });

});

