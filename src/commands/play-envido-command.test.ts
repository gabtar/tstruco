import { GameStateFactory } from '../factories/game-state.factory';
import { Card } from '../models/card';
import { EnvidoPair } from '../models/envido-pair';
import { PlayEnvidoCommand } from './play-envido-command';

describe('#execute', () => {
  const rules = {
    numberOfPlayers: 2,
    flor: false,
    maxPoints: 15,
  };
  let gameState = GameStateFactory.createGame(rules);
  const player1 = gameState.hand.players[0];
  const player2 = gameState.hand.players[1];
  const card1 = new Card('1', 'E');
  const card2 = new Card('7', 'E');
  player1.cards = [card1, card2];

  beforeEach(() => {
    gameState = GameStateFactory.createGame(rules);
    gameState.hand.turns.chantEnvidoTurn = player1;
    gameState.hand.players[0].cards = [card1, card2];
    player1.cards = [card1, card2];
  });

  it('Should set the envido score for the player', () => {
    gameState = new PlayEnvidoCommand(gameState, player1, [
      card1,
      card2,
    ]).execute();

    expect(gameState.hand.envido.cardsPlayed.has(0)).toBeTruthy();
  });

  it('Should throw error when its not player turn', () => {
    gameState.hand.turns.chantEnvidoTurn = player2;
    const playEnvidoCommand = new PlayEnvidoCommand(gameState, player1, [
      card1,
      card2,
    ]);

    expect(() => playEnvidoCommand.execute()).toThrow('0 is not your turn!');
  });

  it('Should throw error when player does not have the cards passed', () => {
    player1.cards = [];
    const playEnvidoCommand = new PlayEnvidoCommand(gameState, player1, [
      card1,
      card2,
    ]);

    expect(() => playEnvidoCommand.execute()).toThrow(
      'You dont have a 1E card',
    );
  });

  it('Should throw Error when envido has already ended', () => {
    gameState.hand.envido.playCards(0, new EnvidoPair(card1, card2));
    gameState.hand.envido.playCards(1, new EnvidoPair(card1, card2));

    const playEnvidoCommand = new PlayEnvidoCommand(gameState, player1, [
      card1,
      card2,
    ]);

    expect(() => playEnvidoCommand.execute()).toThrow('Envido ended');
  });
});
