import { HandFactory } from './hand.factory';
import { PlayerFactory } from './player.factory';

describe('#from', () => {
  it('Should return player 0 won the hand when deserialized', () => {
    const p1wonHand =
      'F15#2#1O12O1C11E6B4C##N#N#1O4C-1C6B-00#H1C0--P0---#A0B1#T';

    const segments = [...p1wonHand.split('#')];
    const players = PlayerFactory.from(2, segments[2]);
    const hand = HandFactory.from(
      segments[6],
      segments[3],
      segments[4],
      segments[7],
      segments[9],
      segments[5],
      players,
      true,
    );

    expect(hand.winner()).toBe(players[0].team);
  });
});
