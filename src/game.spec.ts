import { Game } from "./game";

describe("Add player", () => {
  test("Should add a player to the game", () => {
    const player = {name: 'Player 1', cards: []}
    const newGame = new Game();

    newGame.addPlayer(player);
    expect(newGame.getPlayers()).toContain(player);
  })
});
