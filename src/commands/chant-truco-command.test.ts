import { GameStateFactory } from "../factories/game-state.factory";
import { TrucoLevel } from "../types";
import { ChantTrucoCommmand } from "./chant-truco-command";


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

  it('Should raise error if not player turn', () => {
    gameState.hand.turns.responseTrucoChantTurn = player1.team

    const chantTrucoCommand = new ChantTrucoCommmand(gameState, player2, TrucoLevel.Truco);

    expect(() => chantTrucoCommand.execute()).toThrow('Not your turn!');
  });

  it('Should raise error if chanted level is lower or equal to current level', () => {
    gameState.hand.turns.responseTrucoChantTurn = player1.team;
    gameState.hand.trucoLevel = TrucoLevel.Retruco

    const chantTrucoCommand = new ChantTrucoCommmand(gameState, player1, TrucoLevel.Truco);

    expect(() => chantTrucoCommand.execute()).toThrow('Invalid Truco Level');
  });
});

