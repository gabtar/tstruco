import exp = require('constants');
import { PlayerFactory } from './player.factory';

describe('PlayerFactory createPlayers', () => {
  it('Should create 2 players of diferent team', () => {
    let players = PlayerFactory.createPlayers(2);

    expect(players.length).toEqual(2);
    expect(players[0].team).not.toEqual(players[1].team);
  });

  it('Should create 3 players for each team', () => {
    let players = PlayerFactory.createPlayers(6);

    let teamOnePlayers = players.filter((player) => player.team == 'A');
    let teamTwoPlayers = players.filter((player) => player.team == 'B');

    expect(teamOnePlayers.length).toEqual(teamTwoPlayers.length);
  });
});
