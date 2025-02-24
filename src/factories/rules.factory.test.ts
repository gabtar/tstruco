import { RulesFactory } from './rules.factory';

describe('#from', () => {
  test('Should return rules with 6 players, flor true, and 30 max points when "F30" is passed, and ""6" for number of players', () => {
    const expected = RulesFactory.from('F30', '6');

    expect(expected.numberOfPlayers).toEqual(6);
    expect(expected.flor).toEqual(true);
    expect(expected.maxPoints).toEqual(30);
  });
});
