import { PlayerFactory } from '../factories/player.factory';
import { Turn } from './turn';

describe('drawInitialTurns', () => {
  test('Should set the initial turns for players', () => {
    const players = PlayerFactory.createPlayers(4);

    const turn = new Turn(players, null, null, null);
    turn.drawInitialTurns();

    expect(turn.playCardTurn).not.toBe(null);
    expect(turn.chantEnvidoTurn).not.toBe(null);
    expect(turn.chantTrucoTurn).not.toBe(null);

    expect(turn.playCardTurn).toBe(turn.chantTrucoTurn);
    expect(turn.playCardTurn).toBe(turn.chantEnvidoTurn);
  });
});

describe('advance', () => {
  test('Should set the next player on the array', () => {
    const players = PlayerFactory.createPlayers(6);

    const turn = new Turn(players, players[3], players[3], players[3]);
    turn.nextTurn();

    expect(turn.playCardTurn).toBe(players[4]);
    expect(turn.chantEnvidoTurn).toBe(players[4]);
    expect(turn.chantTrucoTurn).toBe(players[4]);
  });
});
