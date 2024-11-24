import { GameStateFactory } from '../factories/game-state.factory';
import { Card } from '../models/card';
import { FlorLevel } from '../types';
import { PlayFlorCommand } from './play-flor-command';

describe('#execute', () => {
  const rules = {
    numberOfPlayers: 2,
    flor: true,
    maxPoints: 15,
  };
  let gameState = GameStateFactory.createGame(rules);
  const player1 = gameState.hand.players[0];
  const player2 = gameState.hand.players[1];

  const flower1 = [new Card('7', 'E'), new Card('1', 'E'), new Card('4', 'E')];
  const flower2 = [new Card('7', 'B'), new Card('6', 'B'), new Card('4', 'B')];
  player1.cards = flower1;

  it('Play the flower cards', () => {
    const playFlowerCommand = new PlayFlorCommand(gameState, player1, flower1);

    gameState = playFlowerCommand.execute();

    expect(gameState.hand.flor?.cardsPlayed.get(player1.id)).toBe(flower1);
  });

  it('Adds the correct score when a player wons the flower', () => {
    gameState.hand.flor!.chanted = FlorLevel.ContraFlor;
    gameState.hand.flor!.playCards(player1.id, flower1);
    gameState.hand.flor!.accepted! = true;

    const playFlowerCommand = new PlayFlorCommand(gameState, player2, flower2);

    gameState = playFlowerCommand.execute();

    expect(gameState.score.getScore(player2.team)).toBe(6);
  });
});
