import { GameStateFactory } from '../factories/game-state.factory';
import { NewHandCommand } from './new-hand-command';

describe('#execute', () => {
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

  it('Should set next hand player in the player list and set the turns when next hand is started', () => {
    const rules = {
      numberOfPlayers: 6,
      flor: false,
      maxPoints: 15,
    };
    let gameState = GameStateFactory.createGame(rules);
    const initialHandGame = new NewHandCommand(gameState);

    gameState = initialHandGame.execute();
    const firstHandPlayer = gameState.hand.turns.handPlayer;
    const expectedSecondHandPlayer =
      firstHandPlayer!.id === rules.numberOfPlayers - 1
        ? 0
        : firstHandPlayer!.id + 1;

    const secondHandGame = new NewHandCommand(gameState);
    gameState = secondHandGame.execute();

    const gotSecondHandPlayer = gameState.hand.turns.handPlayer?.id;

    expect(gotSecondHandPlayer).toBe(expectedSecondHandPlayer);
  });
});
