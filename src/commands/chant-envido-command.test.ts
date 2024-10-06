import { CardFactory } from '../factories/card.factory';
import { GameStateFactory } from '../factories/game-state.factory';
import { ChantEnvidoCommmand } from './chant-envido-command';

describe('execute', () => {
  it('Should raise error if not in first round', () => {
    const card1 = CardFactory.from('3E');
    const card2 = CardFactory.from('1O');
    const rules = {
      numberOfPlayers: 2,
      flor: false,
      maxPoints: 15,
    };
    let gameState = GameStateFactory.createGame(rules);
    const player1 = gameState.hand.players[0];
    const player2 = gameState.hand.players[1];

    gameState.hand.rounds[0].cardsPlayed.set(player1, card1);
    gameState.hand.rounds[0].cardsPlayed.set(player2, card2);

    const chantEnvidoCommand = new ChantEnvidoCommmand(gameState);

    expect(() => chantEnvidoCommand.execute()).toThrow('Cannot chant envido!');
  });
});
