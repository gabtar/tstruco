import { CardFactory } from './card.factory';
import { PlayerFactory } from './player.factory';
import { RoundFactory } from './round.fatory';

describe('#from', () => {
  it('Should return that Player 1 played 1E and player 2 played 4C on first round when "1E4C00-0000-000" deserialized', () => {
    const players = PlayerFactory.createPlayers(4);
    const rounds = RoundFactory.from('1E4C00-0000-000', players);

    const expectedPlayerOneCard = CardFactory.from('1E');
    const expectedPlayerTwoCard = CardFactory.from('4C');

    expect(rounds[0].cardsPlayed.get(players[0])).toStrictEqual(
      expectedPlayerOneCard,
    );
    expect(rounds[0].cardsPlayed.get(players[1])).toStrictEqual(
      expectedPlayerTwoCard,
    );
  });
});
