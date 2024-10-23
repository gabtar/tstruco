import { GameStateFactory } from '../factories/game-state.factory';
import { EnvidoLevel, GamePhase } from '../types';
import { RespondEnvidoCommmand } from './respond-envido-command';

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

    gameState.hand.turns.playCardTurn = player1;
    gameState.hand.turns.firstEnvidoChant = player1;
    gameState.hand.turns.chantEnvidoTurn = player2;
  });

  test('Should set accepted true and return the original turns when accepted', () => {
    const responseEnvidoCommmand = new RespondEnvidoCommmand(
      gameState,
      player2,
      true,
    );

    gameState = responseEnvidoCommmand.execute();

    expect(gameState.hand.phase).toBe(GamePhase.PlayEnvido);
    expect(gameState.hand.turns.chantEnvidoTurn).toBe(player1);
    expect(gameState.hand.envido.accepted).toBeTruthy();
  });

  test('Should set accepted false and return the original turns when declined', () => {
    gameState.hand.envido.addChant(EnvidoLevel.Envido);

    const responseEnvidoCommmand = new RespondEnvidoCommmand(
      gameState,
      player2,
      false,
    );

    gameState = responseEnvidoCommmand.execute();

    expect(gameState.hand.phase).toBe(GamePhase.Truco);
    expect(gameState.hand.turns.chantEnvidoTurn).toBe(player1);
    expect(gameState.hand.envido.accepted).toBeFalsy();
  });

  test('Should throw an Error when is not player turn', () => {
    const responseEnvidoCommmand = new RespondEnvidoCommmand(
      gameState,
      player1,
      false,
    );

    expect(() => responseEnvidoCommmand.execute()).toThrow(
      '0 is not your turn!',
    );
  });
});
