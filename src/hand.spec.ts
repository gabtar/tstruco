import { Hand } from "./hand";
import { Card, Player } from "./types";

describe("Play card", () => {
  it("Should add a card to the current round", () => {
    const player: Player = {name: 'Player 1', cards: []}
    const card: Card = {rank: "1", suit: "ESPADA" }
    const hand: Hand = new Hand();

    hand.playCard(player,card);

    expect(hand.cardPlayed(player, 0)).toBe(card);
  });
  it("Shouldn't add the card if the player has already placed a card", () => {
    const player: Player = {name: 'Player 1', cards: []}
    const card: Card = {rank: "1", suit: "ESPADA" }
    const hand: Hand = new Hand();

    hand.playCard(player,card);

    expect(() => hand.playCard(player,card)).toThrow(Error);
  });

  it("Should advance to next round if the last player of the round adds a card", () => {
    const player: Player = {name: 'Player 1', cards: []}
    const card: Card = {rank: "1", suit: "ESPADA" }
    const player2: Player = { name: 'Player 2', cards: [] }
    const card2: Card = {rank: "1", suit: "BASTO" }
    const hand: Hand = new Hand();

    hand.playCard(player,card);
    hand.playCard(player2,card2);

    expect(hand.currentRound).toBe(1);
  });
});

describe("Winner", () => {
  it("Should return null when hand is not finished", () => {
    const hand: Hand = new Hand();

    expect(hand.winner()).toBeFalsy();
  });
  it("Should return the winner when a player wins 2 rounds consecutively", () => {
    const hand: Hand = new Hand();

    const player: Player = {name: 'Player 1', cards: []}
    const card: Card = {rank: "1", suit: "ESPADA" }
    const card2: Card = {rank: "7", suit: "ESPADA" }
    const player2: Player = { name: 'Player 2', cards: [] }
    const card3: Card = {rank: "1", suit: "BASTO" }
    const card4: Card = {rank: "7", suit: "ORO" }

    hand.playCard(player,card);
    hand.playCard(player2,card3);
    hand.playCard(player,card2);
    hand.playCard(player2,card4);

    expect(hand.winner()).toBe(player);
  });
});
