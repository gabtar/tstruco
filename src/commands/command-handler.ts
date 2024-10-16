import { CardFactory } from '../factories/card.factory';
import { GameState } from '../models/game-state';
import { ActionParams } from '../types';
import { ChantEnvidoCommmand } from './chant-envido-command';
import { NewGameCommand } from './new-game-command';
import { NewHandCommand } from './new-hand-command';
import { PlayCardCommand } from './play-card-command';
import { PlayEnvidoCommand } from './play-envido-command';
import { RespondEnvidoCommmand } from './respond-envido-command';

export class CommandHandler {
  handle<K extends keyof ActionParams>(
    actionType: K,
    params: ActionParams[K],
    state: GameState,
  ): GameState {
    switch (actionType) {
      case 'playCard':
        return this.playCard(state, params as ActionParams['playCard']);
      case 'newGame':
        return this.newGame(params as ActionParams['newGame']);
      case 'newHand':
        return this.newHand(state);
      case 'chantEnvido':
        return this.chantEnvido(state, params as ActionParams['chantEnvido']);
      case 'respondEnvido':
        return this.respondEnvido(
          state,
          params as ActionParams['respondEnvido'],
        );
      case 'playEnvido':
        return this.playEnvido(state, params as ActionParams['playEnvido']);
      default:
        throw Error('Invalid action!');
    }
  }

  private playCard(
    state: GameState,
    params: ActionParams['playCard'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);
    const card = CardFactory.from(params.card!);

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

    return new PlayEnvidoCommand(state, player, params.cards).execute();
  }
}
