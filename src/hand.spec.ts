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
});
