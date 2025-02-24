import { GameStateFactory } from '../factories/game-state.factory';
import { NewGameCommand } from './new-game-command';

describe('#execute', () => {
  let state = GameStateFactory.createGame({
    numberOfPlayers: 4,
    flor: false,
    maxPoints: 15,
  });

  beforeEach(() => {
    state = GameStateFactory.createGame({
      numberOfPlayers: 4,
      flor: false,
      maxPoints: 15,
    });
  });

  it('Should send a player to deck and remove from players list', () => {
    const newRules = {
      numberOfPlayers: 6,
      flor: true,
      maxPoints: 30,
    };

    const newGameCommand = new NewGameCommand(newRules);
    state = newGameCommand.execute();

    expect(state.rules).toBe(newRules);
  });
});
