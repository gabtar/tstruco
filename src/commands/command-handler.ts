import { CardFactory } from '../factories/card.factory';
import { EnvidoPairFactory } from '../factories/envido-pair.factory';
import { GameState } from '../models/game-state';
import { ActionParams } from '../types';
import { ChantEnvidoCommmand } from './chant-envido-command';
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
      case 'chantTruco':
        return this.chantTruco(state, params as ActionParams['chantTruco']);
      case 'respondTruco':
        return this.respondTruco(state, params as ActionParams['respondTruco']);
      default:
        throw Error('Invalid action!');
    }
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
}
