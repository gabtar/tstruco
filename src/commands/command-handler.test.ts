import { CardFactory } from '../factories/card.factory';
import { GameStateFactory } from '../factories/game-state.factory';
import {
  EnvidoLevel,
  FlorLevel,
  HandPhase,
  Status,
  Team,
  TrucoLevel,
} from '../types';
import { CommandHandler } from './command-handler';

describe('#handle', () => {
  const handler = new CommandHandler();
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

  it('Should throw an error if the game is ended', () => {
    state.status = Status.ENDED;

    expect(() => handler.handle('newHand', {}, state)).toThrow('Game ended');
  });

  it('Should create a new game', () => {
    const newGame = handler.handle(
      'newGame',
      {
        rules: {
          numberOfPlayers: 6,
          flor: false,
          maxPoints: 30,
        },
      },
      state,
    );

    expect(newGame.rules.numberOfPlayers).toBe(6);
    expect(newGame.rules.flor).toBeFalsy();
    expect(newGame.rules.maxPoints).toBe(30);
  });

  it('Should create a new hand', () => {
    state.hand.phase = HandPhase.ChantEnvido;

    const newHandGame = handler.handle('newHand', {}, state);

    expect(newHandGame.hand.phase).toBe(HandPhase.PlayTruco);
  });

  it('Should play a card', () => {
    state.hand.dealCards();
    const playCardTurn = state.hand.turns.playCardTurn!;
    const card = playCardTurn.cards[0];

    state = handler.handle(
      'playCard',
      { player: playCardTurn.id, cardCode: card.toString() },
      state,
    );

    expect(state.hand.rounds[0].cardsPlayed.get(playCardTurn)).toStrictEqual(
      card,
    );
  });

  it('Should chant envido', () => {
    const envidoChantPlayer = state.hand.turns.chantEnvidoTurn!.id;

    const newEnvidoState = handler.handle(
      'chantEnvido',
      {
        player: envidoChantPlayer,
        chant: EnvidoLevel.FaltaEnvido,
      },
      state,
    );

    expect(newEnvidoState.hand.envido.chanted).toContain(
      EnvidoLevel.FaltaEnvido,
    );
  });

  it('Should accept envido', () => {
    const envidoChantPlayer = state.hand.turns.chantEnvidoTurn!.id;

    handler.handle(
      'chantEnvido',
      {
        player: envidoChantPlayer,
        chant: EnvidoLevel.FaltaEnvido,
      },
      state,
    );
    const respondEnvidoState = handler.handle(
      'respondEnvido',
      {
        player: state.hand.turns.chantEnvidoTurn!.id,
        accepted: true,
      },
      state,
    );

    expect(respondEnvidoState.hand.envido.accepted).toBeTruthy();
  });

  it('Should chant flor', () => {
    const flor = [
      CardFactory.from('1E'),
      CardFactory.from('7E'),
      CardFactory.from('4E'),
    ];
    state.hand.players[0].cards = flor;

    const newFlorState = handler.handle(
      'chantFlor',
      {
        player: 0,
        florLevel: FlorLevel.Flor,
      },
      state,
    );

    expect(newFlorState.hand.flor!.chanted).toBe(FlorLevel.Flor);
  });

  it('Should accept flor', () => {
    const flor = [
      CardFactory.from('1E'),
      CardFactory.from('7E'),
      CardFactory.from('4E'),
    ];
    state.hand.players[0].cards = flor;

    handler.handle(
      'chantFlor',
      {
        player: 0,
        florLevel: FlorLevel.Flor,
      },
      state,
    );

    const acceptedFlorState = handler.handle(
      'respondFlor',
      {
        player: 1,
        accepted: true,
      },
      state,
    );

    expect(acceptedFlorState.hand.flor!.accepted).toBeTruthy();
  });

  it('Should chant truco', () => {
    const newTrucoState = handler.handle(
      'chantTruco',
      {
        player: 0,
        trucoLevel: TrucoLevel.ValeCuatro,
      },
      state,
    );

    expect(newTrucoState.hand.trucoLevel).toBe(TrucoLevel.ValeCuatro);
  });

  it('Should respond truco', () => {
    state.hand.envido.addChant(EnvidoLevel.Envido);
    handler.handle(
      'chantTruco',
      {
        player: 0,
        trucoLevel: TrucoLevel.ValeCuatro,
      },
      state,
    );
    const respondTrucoState = handler.handle(
      'respondTruco',
      {
        player: 1,
        accepted: false,
      },
      state,
    );

    expect(respondTrucoState.score.getScore(Team.A)).toBe(
      TrucoLevel.ValeCuatro - 1,
    );
  });

  it('Should send player 0 to deck', () => {
    state = GameStateFactory.createGame({
      numberOfPlayers: 6,
      flor: true,
      maxPoints: 15,
    });
    const newGoToDeckState = handler.handle(
      'goToDeck',
      {
        player: 0,
      },
      state,
    );

    expect(newGoToDeckState.hand.turns.atDeck).toContain(
      newGoToDeckState.hand.players[0],
    );
  });
});
