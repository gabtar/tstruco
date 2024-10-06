import { GameStateFactory } from '../factories/game-state.factory';
import { NewHandCommand } from './new-hand-command';

describe('execute', () => {
  it('Should deal the cards for the players in the new hand', () => {
    const rules = {
      numberOfPlayers: 6,
      flor: false,
      maxPoints: 15,
    };
    let gameState = GameStateFactory.createGame(rules);
    const newHandCommand = new NewHandCommand(gameState);

    gameState = newHandCommand.execute();

    expect(Array.isArray(gameState.hand.players[0].cards)).toBe(true);
    expect(gameState.hand.players[0].cards).toHaveLength(3);
  });
});
