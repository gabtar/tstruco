import { NewGameCommand } from "./new-game-command";


describe('execute', () => {

  it('Should create a new game with the rules passed', () => {
    const rules = {
      numberOfPlayers: 6,
      flor: false,
      maxPoints: 15
    }
    const newGameCommand = new NewGameCommand(rules);
    const gameState = newGameCommand.execute();

    expect(gameState.hand.players.length).toBe(6);
  });

});
