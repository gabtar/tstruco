import { PlayerFactory } from '../factories/player.factory';
import { Team } from '../types';
import { Turn } from './turn';

describe('#drawInitialTurns', () => {
  test('Should set the initial turns for players', () => {
    const players = PlayerFactory.createPlayers(4);

    const turn = new Turn(players);
    turn.drawInitialTurns();

    expect(turn.playCardTurn).not.toBe(null);
    expect(turn.chantEnvidoTurn).not.toBe(null);
    expect(turn.responseTrucoChantTurn).toBe(undefined);

    expect(turn.playCardTurn).toBe(turn.chantEnvidoTurn);
  });
});

describe('#nextTurn', () => {
  test('Should set the next player on the array', () => {
    const players = PlayerFactory.createPlayers(6);

    const turn = new Turn(
      players,
      players[3],
      players[3],
      undefined,
      undefined,
      players[3],
    );

    turn.nextTurn();

    expect(turn.playCardTurn).toBe(players[4]);
    expect(turn.chantEnvidoTurn).toBe(players[4]);
    expect(turn.responseTrucoChantTurn).toBe(undefined);
  });
});

describe('#updateChantEnvidoTurn', () => {
  it('Should set next player in the list for chant envido turn', () => {
    const players = PlayerFactory.createPlayers(6);

    const turn = new Turn(players, players[3], players[3]);
    turn.updateChantEnvidoTurn();

    expect(turn.chantEnvidoTurn).toBe(players[4]);
  });
});

describe('#handPlayerOrder', () => {
  it('Should return an array with the player order starting from the hand player', () => {
    const players = PlayerFactory.createPlayers(6);

    const turn = new Turn(players, players[3], players[3]);

    expect(turn.handPlayerOrder()).toEqual([3, 4, 5, 0, 1, 2]);
  });
});

describe('#goToDeck', () => {
  it("Should send a player to deck and remove from active player's list", () => {
    const players = PlayerFactory.createPlayers(6);
    const playerFive = players[4];
    const turn = new Turn(players, players[3], players[3]);

    turn.goToDeck(playerFive.id);

    expect(turn.players).not.toContain(playerFive);
    expect(turn.atDeck).toContain(playerFive);
  });
});

describe('#teamAtDeck', () => {
  it('Should retrun A when all Team A players are at deck', () => {
    const players = PlayerFactory.createPlayers(4);
    const turn = new Turn(players, players[3], players[3]);

    turn.goToDeck(players[0].id);
    turn.goToDeck(players[2].id);

    expect(turn.teamAtDeck()).toBe(Team.A);
  });

  it('Should retrun undefined when not all Team A players are at deck', () => {
    const players = PlayerFactory.createPlayers(6);
    const turn = new Turn(players, players[3], players[3]);

    turn.goToDeck(players[0].id);
    turn.goToDeck(players[2].id);

    expect(turn.teamAtDeck()).toBeUndefined();
  });
});

describe('#serilize', () => {
  const players = PlayerFactory.createPlayers(4);
  const turn = new Turn(players);

  it('Should return -------- when no turns assigned', () => {
    expect(turn.serialize()).toBe('--------');
  });

  it('Should return H2C2------- when player 3 has hand and chant envido turn', () => {
    turn.handPlayer = players[2];
    turn.chantEnvidoTurn = players[2];

    expect(turn.serialize()).toBe('H2C2------');
  });

  it('Should return H2C2------D01 when player 3 has hand and chant envido turn, and player 0 and 1 are at deck', () => {
    turn.handPlayer = players[2];
    turn.chantEnvidoTurn = players[2];
    turn.atDeck = [players[0], players[1]];

    expect(turn.serialize()).toBe('H2C2-----D01');
  });
});
