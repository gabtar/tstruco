import { CardFactory } from '../factories/card.factory';
import { GameStateFactory } from '../factories/game-state.factory';
import { PlayerFactory } from '../factories/player.factory';
import { FlorLevel } from '../types';
import { ChantFlorCommand } from './chant-flor-command';

describe('#execute', () => {
  const p1Cards = [
    CardFactory.from('1E'),
    CardFactory.from('5E'),
    CardFactory.from('12E'),
  ];
  const p2Cards = [
    CardFactory.from('6B'),
    CardFactory.from('4O'),
    CardFactory.from('12B'),
  ];

  const players = PlayerFactory.createPlayers(2);
  players[0].cards = p1Cards;
  players[1].cards = p2Cards;

  let state = GameStateFactory.createGame({
    numberOfPlayers: 2,
    flor: true,
    maxPoints: 15,
  });

  beforeEach(() => {
    state = GameStateFactory.createGame({
      numberOfPlayers: 2,
      flor: true,
      maxPoints: 15,
    });
    state.hand.players = players;
  });

  it('Should chant flor when no opponent has a flor', () => {
    const chantFlorCommand = new ChantFlorCommand(
      state,
      players[0],
      FlorLevel.Flor,
    );

    state = chantFlorCommand.execute();

    expect(state.hand.flor!.chanted).toBe(FlorLevel.Flor);
  });

  it('Should throw error if when flor is not available on the game', () => {
    state = GameStateFactory.createGame({
      numberOfPlayers: 2,
      flor: false,
      maxPoints: 15,
    });

    const chantFlorCommand = new ChantFlorCommand(
      state,
      players[0],
      FlorLevel.Flor,
    );

    expect(() => chantFlorCommand.execute()).toThrow(
      'You are playing without Flor',
    );
  });

  it('Should throw error if player does not have flor', () => {
    const chantFlorCommand = new ChantFlorCommand(
      state,
      players[1],
      FlorLevel.Flor,
    );

    expect(() => chantFlorCommand.execute()).toThrow('You dont have a Flor');
  });

  it('Should throw error if not in first round', () => {
    const chantFlorCommand = new ChantFlorCommand(
      state,
      players[0],
      FlorLevel.Flor,
    );

    state.hand.playCard(players[0], players[0].cards[1]);
    state.hand.playCard(players[1], players[1].cards[1]);

    expect(() => chantFlorCommand.execute()).toThrow('Cannot chant flor!');
  });

  it("Should add directly 3 points to the player's team if no one of opponent team has a flor", () => {
    const chantFlorCommand = new ChantFlorCommand(
      state,
      players[0],
      FlorLevel.Flor,
    );

    state = chantFlorCommand.execute();

    expect(state.score.getScore(players[0].team)).toBe(3);
  });
});
