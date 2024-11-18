import { PlayerFactory } from '../factories/player.factory';
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
