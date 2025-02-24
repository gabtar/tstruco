import { CardFactory } from '../factories/card.factory';
import { HandFactory } from '../factories/hand.factory';
import { PlayerFactory } from '../factories/player.factory';
import { Card } from './card';

describe('#currentRound', () => {
  const card1 = new Card('1', 'E');
  const card2 = new Card('3', 'B');
  const players = PlayerFactory.createPlayers(2);
  const hand = HandFactory.createHand(players);

  it('Should return 0 when the first round has not finished yet', () => {
    expect(hand.currentRound).toBe(0);
  });

  it('Should return 1 when the first round has finished and the second is still being played', () => {
    hand.rounds[0].cardsPlayed.set(players[0], card1);
    hand.rounds[0].cardsPlayed.set(players[1], card2);

    expect(hand.currentRound).toBe(1);
  });
});

describe('#dealCards', () => {
  const players = PlayerFactory.createPlayers(2);
  const hand = HandFactory.createHand(players);

  it('Should deal 3 cards for each player in the hand', () => {
    hand.dealCards();

    for (const player of hand.players) {
      expect(player.cards.length).toBe(3);
    }
  });
});

describe('#getPlayer', () => {
  const players = PlayerFactory.createPlayers(2);
  const hand = HandFactory.createHand(players);

  it('Should return the player of the index passed', () => {
    const player = hand.getPlayer(1);

    expect(player).toBe(players[1]);
  });
});

describe('#winner', () => {
  const players = PlayerFactory.createPlayers(2);
  let hand = HandFactory.createHand(players);
  const player1 = players[0];
  const player2 = players[1];

  const card1 = CardFactory.from('1E');
  const card2 = CardFactory.from('4C');

  beforeEach(() => (hand = HandFactory.createHand(players)));

  it('Should return undefined when no player has won at least 2 round', () => {
    hand.rounds[0].playCard(player1, card1);
    hand.rounds[0].playCard(player2, card2);

    expect(hand.winner()).toBeUndefined();
  });

  it('Should return player1 team when he has won first and 2nd round', () => {
    hand.rounds[0].playCard(player1, card1);
    hand.rounds[0].playCard(player2, card2);

    const card3 = CardFactory.from('1B');
    const card4 = CardFactory.from('4O');
    hand.rounds[1].playCard(player1, card3);
    hand.rounds[1].playCard(player2, card4);

    expect(hand.winner()).toBe(player1.team);
  });

  it('Should return player1 team when he has won first round and 2nd round is tied', () => {
    hand.rounds[0].playCard(player1, card1);
    hand.rounds[0].playCard(player2, card2);

    const card3 = CardFactory.from('5E');
    const card4 = CardFactory.from('5O');
    hand.rounds[1].playCard(player1, card3);
    hand.rounds[1].playCard(player2, card4);

    expect(hand.winner()).toBe(player1.team);
  });

  it('Should return player2 team when he has tied 1st and 2nd round, and won 3rd round', () => {
    const card3 = CardFactory.from('5E');
    const card4 = CardFactory.from('5O');
    hand.rounds[0].playCard(player1, card3);
    hand.rounds[0].playCard(player2, card4);

    const card5 = CardFactory.from('4B');
    const card6 = CardFactory.from('4E');
    hand.rounds[1].playCard(player1, card5);
    hand.rounds[1].playCard(player2, card6);

    hand.rounds[2].playCard(player1, card2); // 1E
    hand.rounds[2].playCard(player2, card1); // 4C

    expect(hand.winner()).toBe(player2.team);
  });

  it('Should return hand player when team 1 and team 2 has tied all rounds', () => {
    const card3 = CardFactory.from('5E');
    const card4 = CardFactory.from('5O');
    hand.rounds[0].playCard(player1, card3);
    hand.rounds[0].playCard(player2, card4);

    const card5 = CardFactory.from('4B');
    const card6 = CardFactory.from('4E');
    hand.rounds[1].playCard(player1, card5);
    hand.rounds[1].playCard(player2, card6);

    const card7 = CardFactory.from('12B');
    const card8 = CardFactory.from('12E');
    hand.rounds[2].playCard(player1, card7);
    hand.rounds[2].playCard(player2, card8);

    expect(hand.winner()).toBe(hand.turns.handPlayer?.team);
  });

  it('Should return player 1 when first card goes parda and second card is winned by player 1', () => {
    hand.rounds[0].playCard(player1, CardFactory.from('4C'));
    hand.rounds[0].playCard(player2, CardFactory.from('4O'));

    hand.rounds[1].playCard(player1, CardFactory.from('11O'));
    hand.rounds[1].playCard(player2, CardFactory.from('1C'));

    expect(hand.winner()).toBe(player2.team);
  });
});

describe('#serialize', () => {
  const players = PlayerFactory.createPlayers(2);
  let hand = HandFactory.createHand(players);

  it('Should return 00-00-00 when no card was played', () => {
    expect(hand.serialize()).toBe('00-00-00');
  });

  it('Should return 01E4C0-0000-0000 when player 2 played 1E and player 3 4C', () => {
    const fourPlayers = PlayerFactory.createPlayers(4);
    hand = HandFactory.createHand(fourPlayers);

    const card1E = CardFactory.from('1E');
    const card4C = CardFactory.from('4C');

    fourPlayers[1].cards[0] = card1E;
    fourPlayers[2].cards[0] = card4C;

    hand.playCard(fourPlayers[1], card1E);
    hand.playCard(fourPlayers[2], card4C);

    expect(hand.serialize()).toBe('01E4C0-0000-0000');
  });
});
