import { GameStateFactory } from '../factories/game-state.factory';
import { PlayerFactory } from '../factories/player.factory';
import { RespondFlorCommand } from './respond-flor-command';
import { FlorLevel, HandPhase } from '../types';

describe('#execute', () => {
  const declinedFlorScore = 3;

  const players = PlayerFactory.createPlayers(2);

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
  });

  it('Should accept the flor and return the turn to the one/team who chanted', () => {
    state.hand.turns.responseFlorChantTurn = players[0].team;
    const responseFlorCommand = new RespondFlorCommand(state, players[0], true);

    state = responseFlorCommand.execute();

    expect(state.hand.flor!.accepted).toBeTruthy();
    expect(state.hand.phase).toBe(HandPhase.PlayFlor);
  });

  it('Should decline the flor and set the score to the opponent team', () => {
    state.hand.turns.responseFlorChantTurn = players[0].team;
    const responseFlorCommand = new RespondFlorCommand(state, players[0], true);

    state = responseFlorCommand.execute();

    expect(state.hand.flor!.accepted).toBeTruthy();
    expect(state.hand.phase).toBe(HandPhase.PlayFlor);
  });

  it('Should decline the flor and set the score to the opponent team', () => {
    state.hand.turns.responseFlorChantTurn = players[0].team;
    state.hand.flor!.chanted = FlorLevel.Flor;
    const responseFlorCommand = new RespondFlorCommand(
      state,
      players[0],
      false,
    );

    state = responseFlorCommand.execute();

    expect(state.hand.flor!.accepted).toBeFalsy();
    expect(state.score.getScore(players[1].team)).toBe(declinedFlorScore);
  });
});
