import { GameStateFactory } from '../factories/game-state.factory';
import { GoToDeckCommand } from './go-to-deck-command';

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
    const player = state.hand.getPlayer(3);

    const goToDeckCommand = new GoToDeckCommand(state, player);
    state = goToDeckCommand.execute();

    expect(state.hand.turns.atDeck).toContain(player);
  });
});
