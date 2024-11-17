import { CardFactory } from '../factories/card.factory';
import { GameState } from '../models/game-state';
import { ActionParams, Status } from '../types';
import { ChantEnvidoCommmand } from './chant-envido-command';
import { ChantFlorCommand } from './chant-flor-command';
import { ChantTrucoCommmand } from './chant-truco-command';
import { NewGameCommand } from './new-game-command';
import { NewHandCommand } from './new-hand-command';
import { PlayCardCommand } from './play-card-command';
import { PlayEnvidoCommand } from './play-envido-command';
import { RespondEnvidoCommmand } from './respond-envido-command';
import { RespondTrucoCommmand } from './respond-truco-command';

export class CommandHandler {
  handle<K extends keyof ActionParams>(
    actionType: K,
    params: ActionParams[K],
    state: GameState,
  ): GameState {
    if (state.status === Status.ENDED) {
      throw Error('Game ended');
    }

    switch (actionType) {
      case 'playCard':
        state = this.playCard(state, params as ActionParams['playCard']);
        break;
      case 'newGame':
        state = this.newGame(params as ActionParams['newGame']);
        break;
      case 'newHand':
        state = this.newHand(state);
        break;
      case 'chantEnvido':
        state = this.chantEnvido(state, params as ActionParams['chantEnvido']);
        break;
      case 'respondEnvido':
        state = this.respondEnvido(
          state,
          params as ActionParams['respondEnvido'],
        );
        break;
      case 'playEnvido':
        state = this.playEnvido(state, params as ActionParams['playEnvido']);
        break;
      case 'chantTruco':
        state = this.chantTruco(state, params as ActionParams['chantTruco']);
        break;
      case 'respondTruco':
        state = this.respondTruco(
          state,
          params as ActionParams['respondTruco'],
        );
        break;
      case 'chantFlor':
        state = this.chantFlor(state, params as ActionParams['chantFlor']);
        break;
      default:
        throw Error('Invalid action!');
    }

    if (state.hand.winner()) {
      state = this.newHand(state);
    }

    if (state.score.maxScore() >= state.rules.maxPoints) {
      state.status = Status.ENDED;
    }

    return state;
  }

  private playCard(
    state: GameState,
    params: ActionParams['playCard'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);
    const card = CardFactory.from(params.cardCode!);

    return new PlayCardCommand(state, player, card).execute();
  }

  private newGame(params: ActionParams['newGame']): GameState {
    return new NewGameCommand(
      (params as ActionParams['newGame']).rules,
    ).execute();
  }

  private newHand(state: GameState): GameState {
    return new NewHandCommand(state).execute();
  }

  private chantEnvido(
    state: GameState,
    params: ActionParams['chantEnvido'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);
    const chant = params.chant;

    return new ChantEnvidoCommmand(state, player, chant).execute();
  }

  private respondEnvido(
    state: GameState,
    params: ActionParams['respondEnvido'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);
    const accepted = params.accepted;

    return new RespondEnvidoCommmand(state, player, accepted).execute();
  }

  private playEnvido(
    state: GameState,
    params: ActionParams['playEnvido'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);
    const cards = [CardFactory.from(params.cardsCode[0])];

    if (params.cardsCode.length > 1) {
      cards.push(CardFactory.from(params.cardsCode[1]));
    }

    return new PlayEnvidoCommand(state, player, cards).execute();
  }

  private chantTruco(
    state: GameState,
    params: ActionParams['chantTruco'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);

    return new ChantTrucoCommmand(state, player, params.trucoLevel).execute();
  }

  private respondTruco(
    state: GameState,
    params: ActionParams['respondTruco'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);

    return new RespondTrucoCommmand(state, player, params.accepted).execute();
  }

  private chantFlor(
    state: GameState,
    params: ActionParams['chantFlor'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);

    return new ChantFlorCommand(state, player, params.florLevel).execute();
  }
}
