import { Game } from "./game";
import { Player } from "./types";

describe("Add player", () => {
  test("Should add a player to the game", () => {
    let player: Player = {name: 'Player 1', cards: []}
    const newGame = new Game();

    newGame.addPlayer(player);
    expect(newGame.getPlayers()).toContain(player);
  })
});
