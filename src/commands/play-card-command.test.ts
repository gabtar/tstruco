import { HandFactory } from '../factories/hand.factory';
import { PlayerFactory } from '../factories/player.factory';
import { Card } from '../models/card';
import { PlayCardCommand } from './play-card-command';

describe('execute', () => {
  const card1 = new Card('1', 'E');
  const players = PlayerFactory.createPlayers(2);
  const hand = HandFactory.createHand(players);

  it('Should add the card to the current round', () => {
    const player1 = players[0];
    hand.turns.playCardTurn = player1;
    const playCardCommand = new PlayCardCommand(hand, player1, card1);

    playCardCommand.execute();

    expect(hand.rounds[0].cardsPlayed.get(player1)).toBe(card1);
  });

  it('Should throw an Error if its not player turn', () => {
    const player1 = players[0];
    hand.turns.playCardTurn = players[1];
    const playCardCommand = new PlayCardCommand(hand, player1, card1);

    expect(() => playCardCommand.execute()).toThrow('0 is not your turn!');
  });

  it('Should throw an Error if is not Truco phase', () => {
    const player1 = players[0];
    hand.turns.playCardTurn = players[0];
    hand.phase = 'ENVIDO';
    const playCardCommand = new PlayCardCommand(hand, player1, card1);

    expect(() => playCardCommand.execute()).toThrow(
      'Cannot play a card during ENVIDO',
    );
  });
});
