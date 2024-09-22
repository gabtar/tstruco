import { HandFactory } from '../factories/hand.factory';
import { PlayerFactory } from '../factories/player.factory';
import { Card } from './card';

describe('currentRound', () => {
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
