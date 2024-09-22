import { PlayerFactory } from '../factories/player.factory';
import { Card } from './card';
import { Player } from './player';
import { Round } from './round';

describe('Winner', () => {
  const card1 = new Card('1', 'E');
  const card2 = new Card('1', 'B');
  const players = PlayerFactory.createPlayers(2);
  const round = new Round(new Map<Player, Card>(), players);

  it('Should return null when rounds is not finished', () => {
    expect(round.winner()).toBeNull();
  });

  it('Should return the player who won the round', () => {
    round.cardsPlayed.set(players[0], card1);
    round.cardsPlayed.set(players[1], card2);

    expect(round.winner()).toContain(players[0]);
    expect(round.winner()).not.toContain(players[1]);
  });
});

describe('Play card', () => {
  const card1 = new Card('1', 'E');
  const players = PlayerFactory.createPlayers(2);
  const round = new Round(new Map<Player, Card>(), players);

  it('Should play a card', () => {
    round.playCard(players[0], card1);
    expect(round.cardsPlayed.get(players[0])).toBe(card1);
  });

  it('Should not play a card if the player has already placed a card in the round', () => {
    const card2 = new Card('1', 'B');
    const round2 = new Round(new Map<Player, Card>(), players);
    round2.playCard(players[0], card1);

    expect(() => round2.playCard(players[0], card2)).toThrow(
      'Player already played a card in this round!',
    );
  });
});
