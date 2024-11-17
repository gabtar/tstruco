import { CardFactory } from '../factories/card.factory';
import { GameStateFactory } from '../factories/game-state.factory';
import { PlayerFactory } from '../factories/player.factory';
import { GamePhase } from '../types';
import { PlayCardCommand } from './play-card-command';

describe('#execute', () => {
  const card1 = CardFactory.from('1E');
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

  it('Should advance to next round when playing a card ends the round', () => {
    const card2 = CardFactory.from('5O');
    state.hand.turns.players = players;
    const player1 = players[0];
    const player2 = players[1];
    const playCardCommand1 = new PlayCardCommand(state, player1, card1);
    const playCardCommand2 = new PlayCardCommand(state, player2, card2);

    state.hand.turns.setTurns(player1);
    state = playCardCommand1.execute();
    state = playCardCommand2.execute();

    expect(state.hand.currentRound).toBe(1);
  });
});
