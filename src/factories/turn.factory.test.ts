import { PlayerFactory } from './player.factory';
import { TurnFactory } from './turn.factory';

describe('from', () => {
  test('Should return a turn with handplayer, envido chant turn and play card when H2C2--P2--- is deserialized', () => {
    const players = PlayerFactory.createPlayers(6);
    const turns = TurnFactory.from('H2C2--P2---', players);

    const expectedHandPlayer = players[2];
    const expectedChantEnvidoPlayer = players[2];
    const expectedPlayCardPlayer = players[2];

    expect(turns.handPlayer).toBe(expectedHandPlayer);
    expect(turns.chantEnvidoTurn).toBe(expectedChantEnvidoPlayer);
    expect(turns.playCardTurn).toBe(expectedPlayCardPlayer);
  });

  test('Should return a turn with all turns setted when H2C2T3F3P2Y2Z2D45 is deserialized', () => {
    const players = PlayerFactory.createPlayers(6);
    const turns = TurnFactory.from('H2C2T3F3P2Y2Z2D45', players);

    const expectedHandPlayer = players[2];
    const expectedChantEnvidoPlayer = players[2];
    const expectedTrucoChantTurn = players[3].team;
    const expectedFlorChantTurn = players[3].team;
    const expectedPlayCardPlayer = players[2];
    const expectedFirstEnvidoChant = players[2];
    const expectedFirstFlorChant = players[2];
    const expectedAtDeck = [players[4], players[5]];

    expect(turns.handPlayer).toBe(expectedHandPlayer);
    expect(turns.chantEnvidoTurn).toBe(expectedChantEnvidoPlayer);
    expect(turns.responseTrucoChantTurn).toBe(expectedTrucoChantTurn);
    expect(turns.responseFlorChantTurn).toBe(expectedFlorChantTurn);
    expect(turns.playCardTurn).toBe(expectedPlayCardPlayer);
    expect(turns.firstEnvidoChant).toBe(expectedFirstEnvidoChant);
    expect(turns.firstFlorChant).toBe(expectedFirstFlorChant);
    expectedAtDeck.forEach((player) => expect(turns.atDeck).toContain(player));
  });
});
