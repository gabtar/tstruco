import { GameStateFactory } from '../factories/game-state.factory';
import { PlayerFactory } from '../factories/player.factory';
import { Card } from '../models/card';
import { GamePhase } from '../types';
import { PlayCardCommand } from './play-card-command';

describe('#execute', () => {
  const card1 = new Card('1', 'E');
  const players = PlayerFactory.createPlayers(2);
  let state = GameStateFactory.createGame({
    numberOfPlayers: 2,
    flor: false,
    maxPoints: 15,
  });

  beforeEach(() => {
    state = GameStateFactory.createGame({
      numberOfPlayers: 2,
      flor: false,
      maxPoints: 15,
    });
  });

  it('Should add the card to the current round', () => {
    const player1 = players[0];
    state.hand.turns.playCardTurn = player1;
    const playCardCommand = new PlayCardCommand(state, player1, card1);

    playCardCommand.execute();

    expect(state.hand.rounds[0].cardsPlayed.get(player1)).toBe(card1);
  });

  it('Should throw an Error if its not player turn', () => {
    const player1 = players[0];
    state.hand.turns.playCardTurn = players[1];
    const playCardCommand = new PlayCardCommand(state, player1, card1);

    expect(() => playCardCommand.execute()).toThrow('0 is not your turn!');
  });

  it('Should throw an Error if is not Truco phase', () => {
    const player1 = players[0];
    state.hand.turns.playCardTurn = players[0];
    state.hand.phase = GamePhase.ChantEnvido;
    const playCardCommand = new PlayCardCommand(state, player1, card1);

    expect(() => playCardCommand.execute()).toThrow(
      'Cannot play a card during CHANT_ENVIDO',
    );
  });

  it('Should throw an Error if card was already played', () => {
    const player1 = players[0];
    state.hand.turns.playCardTurn = players[0];
    state.hand.rounds[0].playCard(player1, card1);
    const playCardCommand = new PlayCardCommand(state, player1, card1);

    expect(() => playCardCommand.execute()).toThrow('1E was already played');
  });
});
