import { CardFactory } from '../factories/card.factory';
import { PlayerFactory } from '../factories/player.factory';

describe('#opponentTeam', () => {
  const players = PlayerFactory.createPlayers(2);

  it('Should return the opposite team of the player', () => {
    const playerTeam = players[0].team;

    expect(players[0].opponentTeam()).not.toBe(playerTeam);
  });
});

describe('#hasFlor', () => {
  let players = PlayerFactory.createPlayers(2);

  const florHand = [
    CardFactory.from('1E'),
    CardFactory.from('7E'),
    CardFactory.from('4E'),
  ];

  const nonFlorHand = [
    CardFactory.from('1E'),
    CardFactory.from('2O'),
    CardFactory.from('1B'),
  ];

  it('Should return true when player has a Flor', () => {
    players[0].cards = florHand;

    expect(players[0].hasFlor()).toBeTruthy();
  });

  it('Should return false when does not have a Flor', () => {
    players[0].cards = nonFlorHand;

    expect(players[0].hasFlor()).toBeFalsy();
  });
});

describe('#serializeCards', () => {
  let players = PlayerFactory.createPlayers(2);

  const cards = [
    CardFactory.from('1E'),
    CardFactory.from('3O'),
    CardFactory.from('7B'),
  ];

  it('Should return an empty string when the cards has not been dealt', () => {
    expect(players[0].serializeCards()).toBe("");
  });

  it('Should the cards code of the cards dealt to the player', () => {
    players[0].cards = cards;

    expect(players[0].serializeCards()).toBe("1E3O7B");
  });
});
