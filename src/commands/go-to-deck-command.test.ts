import { EnvidoFactory } from '../factories/envido.factory';
import { FlorFactory } from '../factories/flor.factory';
import { GameStateFactory } from '../factories/game-state.factory';
import { HandPhase, Team } from '../types';
import { GoToDeckCommand } from './go-to-deck-command';

describe('#execute', () => {
  let state = GameStateFactory.createGame({
    numberOfPlayers: 4,
    flor: false,
    maxPoints: 15,
  });

  beforeEach(() => {
    state = GameStateFactory.createGame({
      numberOfPlayers: 4,
      flor: false,
      maxPoints: 15,
    });
  });

  it('Should send a player to deck and remove from players list', () => {
    const player = state.hand.getPlayer(3);

    const goToDeckCommand = new GoToDeckCommand(state, player);
    state = goToDeckCommand.execute();

    expect(state.hand.turns.atDeck).toContain(player);
  });

  it('Should add the extra not chanted envido point to the opponent if all team goes to deck before first round and envido wasnt chanted', () => {
    const player1TeamA = state.hand.getPlayer(0);
    const player2TeamA = state.hand.getPlayer(2);

    const goToDeckCommand = new GoToDeckCommand(state, player1TeamA);
    state = goToDeckCommand.execute();
    const goToDeckCommandTwo = new GoToDeckCommand(state, player2TeamA);
    state = goToDeckCommandTwo.execute();

    expect(state.score.getScore(Team.B)).toBe(2);
  });

  it('Should not add the extra not chanted envido point if envido already played during first round', () => {
    state = GameStateFactory.createGame({
      numberOfPlayers: 2,
      flor: false,
      maxPoints: 15,
    });

    const alreadyPlayedEnvido = EnvidoFactory.from('EEA-01E7E-13B7B-1', 0, 2);
    state.hand.envido = alreadyPlayedEnvido;

    const goToDeckCommand = new GoToDeckCommand(state, state.hand.getPlayer(1));
    state = goToDeckCommand.execute();

    expect(state.score.getScore(Team.A)).toBe(1);
  });

  it('Should add the total envido score if a player/team goes to deck during an envido play', () => {
    state = GameStateFactory.createGame({
      numberOfPlayers: 2,
      flor: false,
      maxPoints: 15,
    });

    const envidoInProgress = EnvidoFactory.from('EEA-01E7E-N', 0, 2);
    state.hand.phase = HandPhase.PlayEnvido;
    state.hand.envido = envidoInProgress;

    const goToDeckCommand = new GoToDeckCommand(state, state.hand.getPlayer(1));
    state = goToDeckCommand.execute();

    // NOTE: Score when going to deck
    // Acepted Envido Envido chant -> 2 + 2 = 4 points total
    // + 1 of not chanted Truco
    expect(state.score.getScore(Team.A)).toBe(4 + 1);
  });

  it('Should add the total flor score if a player/team goes to deck during a flor play', () => {
    state = GameStateFactory.createGame({
      numberOfPlayers: 2,
      flor: true,
      maxPoints: 15,
    });

    const florInProgrees = FlorFactory.from('CA-01E7E4E-N', 0, 2);
    state.hand.phase = HandPhase.PlayFlor;
    state.hand.flor = florInProgrees;

    const goToDeckCommand = new GoToDeckCommand(state, state.hand.getPlayer(1));
    state = goToDeckCommand.execute();

    // NOTE: Score when going to deck
    // Accepted ContraFlor = 6 points + 1 not chanted Truco + 1 for not chanted envido on first round
    expect(state.score.getScore(Team.A)).toBe(6 + 1 + 1);
  });
});
