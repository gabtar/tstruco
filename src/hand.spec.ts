import { Hand } from "./hand";
import { Card, Player } from "./types";

describe("Play card", () => {
  it("Should add a card to the current round", () => {
    const player: Player = { name: 'Player 1' }
    const card: Card = { rank: "1", suit: "ESPADA" }
    const hand: Hand = new Hand();

    hand.playCard(player,card);

    expect(hand.cardPlayed(player, 0)).toBe(card);
  });
  it("Shouldn't add the card if the player has already placed a card", () => {
    const player: Player = {name: 'Player 1' }
    const card: Card = {rank: "1", suit: "ESPADA" }
    const hand: Hand = new Hand();

    hand.playCard(player,card);

    expect(() => hand.playCard(player,card)).toThrow(Error);
  });

  it("Should advance to next round if the last player of the round adds a card", () => {
    const player1: Player = { name: 'Player 1' }
    const card: Card = { rank: "1", suit: "ESPADA" }
    const player2: Player = { name: 'Player 2' }
    const card2: Card = { rank: "1", suit: "BASTO" }
    const hand: Hand = new Hand();

    hand.playCard(player1,card);
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

    const player1: Player = {name: 'Player 1' }
    const card: Card = {rank: "1", suit: "ESPADA" }
    const card2: Card = {rank: "7", suit: "ESPADA" }
    const player2: Player = { name: 'Player 2' }
    const card3: Card = {rank: "1", suit: "BASTO" }
    const card4: Card = {rank: "7", suit: "ORO" }

    hand.playCard(player1,card);
    hand.playCard(player2,card3);
    hand.playCard(player1,card2);
    hand.playCard(player2,card4);

    expect(hand.winner()).toBe(player1);
  });
  it("Should return the player1 when first round is tied and second round is winned by player1", () => {
    const hand: Hand = new Hand();

    const player1: Player = { name: 'Player 1' }
    const card: Card = { rank: "5", suit: "ESPADA" }
    const card2: Card = { rank: "7", suit: "ESPADA" }
    const player2: Player = { name: 'Player 2' }
    const card3: Card = { rank: "5", suit: "BASTO" }
    const card4: Card = { rank: "7", suit: "ORO" }

    hand.playCard(player1,card);
    hand.playCard(player2,card3);
    hand.playCard(player1,card2);
    hand.playCard(player2,card4);

    expect(hand.winner()).toBe(player1);
  });
  it("Should return the player1 when first and second round are tied and third round is winned by player1", () => {
    const hand: Hand = new Hand();

    const player1: Player = { name: 'Player 1' }
    const card1: Card = { rank: "5", suit: "ESPADA" }
    const card2: Card = { rank: "10", suit: "ESPADA" }
    const card3: Card = { rank: "2", suit: "BASTO" }
    const player2: Player = { name: 'Player 2' }
    const card4: Card = {rank: "5", suit: "COPA" }
    const card5: Card = {rank: "10", suit: "ORO" }
    const card6: Card = {rank: "12", suit: "ORO" }

    hand.playCard(player1,card1);
    hand.playCard(player2,card4);
    hand.playCard(player1,card2);
    hand.playCard(player2,card5);
    hand.playCard(player1,card3);
    hand.playCard(player2,card6);

    expect(hand.winner()).toBe(player1);
  });
  it("Should return the player1 when first round is winned by player1 and second round is tied", () => {
    const hand: Hand = new Hand();

    const player1: Player = { name: 'Player 1' }
    const card1: Card = { rank: "7", suit: "ESPADA" }
    const card2: Card = { rank: "10", suit: "ESPADA" }
    const player2: Player = { name: 'Player 2' }
    const card4: Card = {rank: "5", suit: "COPA" }
    const card5: Card = {rank: "10", suit: "ORO" }

    hand.playCard(player1,card1);
    hand.playCard(player2,card4);
    hand.playCard(player1,card2);
    hand.playCard(player2,card5);

    expect(hand.winner()).toBe(player1);
  });
  it("Should return the player2 when first round is winned by player2, second by player1 and third is tied", () => {
    const hand: Hand = new Hand();

    const player1: Player = { name: 'Player 1' }
    const card1: Card = { rank: "7", suit: "ESPADA" }
    const card2: Card = { rank: "3", suit: "ESPADA" }
    const card3: Card = { rank: "12", suit: "BASTO" }
    const player2: Player = { name: 'Player 2' }
    const card4: Card = { rank: "1", suit: "BASTO" }
    const card5: Card = { rank: "10", suit: "ORO" }
    const card6: Card = { rank: "12", suit: "ORO" }

    hand.playCard(player1,card1);
    hand.playCard(player2,card4);
    hand.playCard(player1,card2);
    hand.playCard(player2,card5);
    hand.playCard(player1,card3);
    hand.playCard(player2,card6);

    expect(hand.winner()).toBe(player2);
  });
  it("Should return the player1 (the hand) when all rounds are tied", () => {
    const hand: Hand = new Hand();

    const player1: Player = { name: 'Player 1' }
    const card1: Card = { rank: "1", suit: "ORO" }
    const card2: Card = { rank: "3", suit: "ESPADA" }
    const card3: Card = { rank: "12", suit: "BASTO" }
    const player2: Player = { name: 'Player 2' }
    const card4: Card = { rank: "1", suit: "COPA" }
    const card5: Card = { rank: "3", suit: "ORO" }
    const card6: Card = { rank: "12", suit: "ORO" }

    hand.playCard(player1,card1);
    hand.playCard(player2,card4);
    hand.playCard(player1,card2);
    hand.playCard(player2,card5);
    hand.playCard(player1,card3);
    hand.playCard(player2,card6);

    expect(hand.winner()).toBe(player1);
  });
});
