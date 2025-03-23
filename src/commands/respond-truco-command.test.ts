import { GameStateFactory } from '../factories/game-state.factory';
import { EnvidoLevel, TrucoLevel } from '../types';
import { RespondTrucoCommmand } from './respond-truco-command';

describe('#execute', () => {
  const rules = {
    numberOfPlayers: 2,
    flor: false,
    maxPoints: 15,
  };
  let gameState = GameStateFactory.createGame(rules);
  const player1 = gameState.hand.players[0];
  const player2 = gameState.hand.players[1];

  beforeEach(() => {
    gameState = GameStateFactory.createGame(rules);
  });

  it('Should raise not your turn when is not teams turn to respond', () => {
    gameState.hand.turns.responseTrucoChantTurn = player1.team;

    const respondTrucoCommand = new RespondTrucoCommmand(
      gameState,
      player2,
      true,
    );

    expect(() => respondTrucoCommand.execute()).toThrow('1 is not your turn!');
  });

  it('Should update responseTrucoChantTurn to opponent team', () => {
    gameState.hand.turns.responseTrucoChantTurn = player1.team;

    const respondTrucoCommand = new RespondTrucoCommmand(
      gameState,
      player1,
      true,
    );

    expect(
      respondTrucoCommand.execute().hand.turns.responseTrucoChantTurn,
    ).toBe(player2.team);
  });

  it('Should update score when declined', () => {
    gameState.hand.turns.responseTrucoChantTurn = player1.team;
    gameState.hand.trucoLevel = TrucoLevel.Truco;
    gameState.hand.envido.addChant(EnvidoLevel.Envido); // Simulates envido chanted

    const respondTrucoCommand = new RespondTrucoCommmand(
      gameState,
      player1,
      false,
    );

    expect(respondTrucoCommand.execute().score.getScore(player2.team)).toBe(1);
  });

  it('Should update score, adding not chanted envido when declined on first round', () => {
    gameState.hand.turns.responseTrucoChantTurn = player1.team;
    gameState.hand.trucoLevel = TrucoLevel.Truco;

    const respondTrucoCommand = new RespondTrucoCommmand(
      gameState,
      player1,
      false,
    );

    expect(respondTrucoCommand.execute().score.getScore(player2.team)).toBe(2);
  });
});
