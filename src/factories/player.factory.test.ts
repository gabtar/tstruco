import { Team } from '../types';
import { CardFactory } from './card.factory';
import { PlayerFactory } from './player.factory';

describe('#createPlayers', () => {
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

describe('#from', () => {
  it('Should the 2 players and assign the cards dealed to them when deserializing 1E4E7O1B12B7E', () => {
    const players = PlayerFactory.from(2, '1E4E7O1B12B7E');

    const expectedCardsPlayer1 = [
      CardFactory.from('1E'),
      CardFactory.from('4E'),
      CardFactory.from('7O'),
    ];
    const expectedCardsPlayer2 = [
      CardFactory.from('1B'),
      CardFactory.from('12B'),
      CardFactory.from('7E'),
    ];

    expect(players.length).toBe(2);
    expectedCardsPlayer1.forEach((card) =>
      expect(players[0].cards).toContainEqual(card),
    );
    expectedCardsPlayer2.forEach((card) =>
      expect(players[1].cards).toContainEqual(card),
    );
  });
});
