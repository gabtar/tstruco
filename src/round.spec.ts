import { Round } from "./round";
import { Player, Card } from "./types";

describe("Play Card", () => {
  const card = { rank: '1', suit: 'ESPADA' } as Card

  it("Should play a card in the round", () => {
    const player = {name: 'Player 1', cards: []}
    const round = new Round();

    round.playCard(player, card);
    expect(round.cardPlayed(player)).toBe(card);
  })
  it("Shouldn't add the card if the player has already placed a card", () => {
    const player: Player = { name: 'Player 1' }
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
    const player1 = { name: 'Player 1' }
    const player2 = { name: 'Player 2' }
    const card1 = { rank: '1', suit: 'ESPADA' } as Card
    const card2 = { rank: '1', suit: 'BASTO' } as Card
    const round = new Round();
    round.playCard(player1, card1);
    round.playCard(player2, card2);

    expect(round.isFinished()).toBeTruthy();
  })
});

describe("Winner", () => {
  it("Should return the winner when a player has won the round", () => {
    const player1 = { name: 'Player 1' }
    const player2 = { name: 'Player 2' }
    const card1 = { rank: '1', suit: 'ESPADA' } as Card
    const card2 = { rank: '1', suit: 'BASTO' } as Card
    const round = new Round();

    round.playCard(player1, card1);
    round.playCard(player2, card2);

    expect(round.winner()).toContain(player1)
  })

  it("Should return the both players if there is a tie", () => {
    const player1 = { name: 'Player 1' }
    const player2 = { name: 'Player 2' }
    const card1 = { rank: '3', suit: 'COPA' } as Card
    const card2 = { rank: '3', suit: 'ORO' } as Card
    const round = new Round();

    round.playCard(player1, card1);
    round.playCard(player2, card2);

    expect(round.winner()).toContain(player1)
    expect(round.winner()).toContain(player2)
  })

  it("Should return null when there is no winner yet", () => {
    const round = new Round();

    expect(round.winner()).toBeFalsy()
  })
});
