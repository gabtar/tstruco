
import { Round } from "./round";
import { Player } from "./types";

describe("Play Card", () => {
  it("Should play a card in the round", () => {
    const player = {name: 'Player 1', cards: []}
    const card = {rank: "1", suit: "ESPADA" }
    const round = new Round();

    round.playCard(player, card);
    expect(round.cardPlayed(player)).toBe(card);
  })
  it("Shouldn't add the card if the player has already placed a card", () => {
    const player: Player = {name: 'Player 1', cards: []}
    const card = {rank: "1", suit: "ESPADA" }
    const round = new Round();

    round.playCard(player,card);

    expect(() => round.playCard(player,card)).toThrow(Error);
  });
});

describe("Finished", () => {
  it("Should return false when not all players played a card", () => {
    const round = new Round();

    expect(round.isFinished()).toBeFalsy();
  })
  it("Should return true if all players played a card", () => {
    const player1 = { name: 'Player 1', cards: [] }
    const player2 = { name: 'Player 2', cards: [] }
    const card1 = { rank: '1', suit: 'ESPADA' }
    const card2 = { rank: '1', suit: 'BASTO' }
    const round = new Round();
    round.playCard(player1, card1);
    round.playCard(player2, card2);

    expect(round.isFinished()).toBeTruthy();
  })

});
