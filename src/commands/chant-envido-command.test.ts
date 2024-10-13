import { CardFactory } from '../factories/card.factory';
import { GameStateFactory } from '../factories/game-state.factory';
import { EnvidoLevel } from '../types';
import { ChantEnvidoCommmand } from './chant-envido-command';

describe('execute', () => {
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

  it('Should raise error if not in first round', () => {
    const card1 = CardFactory.from('3E');
    const card2 = CardFactory.from('1O');

    gameState.hand.rounds[0].cardsPlayed.set(player1, card1);
    gameState.hand.rounds[0].cardsPlayed.set(player2, card2);

    const chantEnvidoCommand = new ChantEnvidoCommmand(
      gameState,
      player1,
      EnvidoLevel.Envido,
    );

    expect(() => chantEnvidoCommand.execute()).toThrow('Cannot chant envido!');
  });

  it('Should raise error if is not player turn', () => {
    gameState.hand.turns.chantEnvidoTurn = player2;
    const chantEnvidoCommand = new ChantEnvidoCommmand(
      gameState,
      player1,
      EnvidoLevel.Envido,
    );

    expect(() => chantEnvidoCommand.execute()).toThrow('Not your turn!');
  });

  it('Should add the new envido level', () => {
    gameState.hand.turns.playCardTurn = player1;
    gameState.hand.turns.chantEnvidoTurn = player1;
    const chantEnvidoCommand = new ChantEnvidoCommmand(
      gameState,
      player1,
      EnvidoLevel.Envido,
    );
    gameState = chantEnvidoCommand.execute();

    const chantEnvidoCommand2 = new ChantEnvidoCommmand(
      gameState,
      player2,
      EnvidoLevel.Envido,
    );
    gameState = chantEnvidoCommand2.execute();

    expect(gameState.hand.envido.chanted).toHaveLength(2);
  });
});
