import { Team } from '../types';
import { PlayerFactory } from './player.factory';

describe('PlayerFactory createPlayers', () => {
  it('Should create 2 players of diferent team', () => {
    const players = PlayerFactory.createPlayers(2);

    expect(players.length).toEqual(2);
    expect(players[0].team).not.toEqual(players[1].team);
  });

  it('Should create 3 players for each team', () => {
    const players = PlayerFactory.createPlayers(6);

    const teamOnePlayers = players.filter((player) => player.team == Team.A);
    const teamTwoPlayers = players.filter((player) => player.team == Team.B);

    expect(teamOnePlayers.length).toEqual(teamTwoPlayers.length);
  });

  it('Should raise error if number of players is not 2, 4, or 6', () => {
    expect(() => PlayerFactory.createPlayers(3)).toThrow(
      'Invalid number of players',
    );
  });
});
