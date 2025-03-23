import { CardFactory } from '../factories/card.factory';
import { GameState } from '../models/game-state';
import { ActionParams, Status } from '../types';
import { ChantEnvidoCommmand } from './chant-envido-command';
import { ChantFlorCommand } from './chant-flor-command';
import { ChantTrucoCommmand } from './chant-truco-command';
import { GoToDeckCommand } from './go-to-deck-command';
import { NewGameCommand } from './new-game-command';
import { NewHandCommand } from './new-hand-command';
import { PlayCardCommand } from './play-card-command';
import { PlayEnvidoCommand } from './play-envido-command';
import { PlayFlorCommand } from './play-flor-command';
import { RespondEnvidoCommmand } from './respond-envido-command';
import { RespondFlorCommand } from './respond-flor-command';
import { RespondTrucoCommmand } from './respond-truco-command';

/**
 * A class for handling commands requests and performs actions in the game of Truco
 *
 * @class CommandHandler
 * @description Handles the main interaction between the public api and the actions available in a game of truco
 */
export class CommandHandler {
  /**
   * Main method to manage the actions in a game of Truco
   *
   * @param {K extends key of ActionParams} actionType - The type of action to be performed on the game
   * @param {ActionParams[K]} params - The parameters needed to perform the action
   * @param {GameState} state - The actual state of the game of Truco
   * @returns {GameState} - The new state of the game of Truco
   */
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
      case 'respondFlor':
        state = this.respondFlor(state, params as ActionParams['respondFlor']);
        break;
      case 'playFlor':
        state = this.playFlor(state, params as ActionParams['playFlor']);
        break;
      case 'goToDeck':
        state = this.goToDeck(state, params as ActionParams['goToDeck']);
        break;
      default:
        throw Error('Invalid action!');
    }

    if (state.hand.winner() != undefined) {
      state = this.newHand(state);
    }

    if (state.score.maxScore() >= state.rules.maxPoints) {
      state.status = Status.ENDED;
    }

    return state;
  }

  /**
   * Plays a card in the current game
   *
   * @private
   * @param {GameState} state - The current game state
   * @param {ActionParams['playCard']} params - The params needed to play a card
   * @returns {GameState} - The new state of the game of Truco
   */
  private playCard(
    state: GameState,
    params: ActionParams['playCard'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);
    const card = CardFactory.from(params.cardCode!);

    return new PlayCardCommand(state, player, card).execute();
  }

  /**
   * Creates a new game acording to the rules passed
   *
   * @private
   * @param {ActionParams['newGame']} params - The params needed with the rules of the new game
   * @returns {GameState} - The new state of the game of Truco
   */
  private newGame(params: ActionParams['newGame']): GameState {
    return new NewGameCommand(
      (params as ActionParams['newGame']).rules,
    ).execute();
  }

  /**
   * Creates a new hand in the game
   *
   * @private
   * @param {ActionParams['newHand']} params - Empty object
   * @returns {GameState} - The new state of the game of Truco
   */
  private newHand(state: GameState): GameState {
    return new NewHandCommand(state).execute();
  }

  /**
   * Chants a level of Envido in a game of Truco
   *
   * @private
   * @param {ActionParams['chantEnvido']} params - The params needed to chant Envido in the current game
   * @returns {GameState} - The new state of the game of Truco
   */
  private chantEnvido(
    state: GameState,
    params: ActionParams['chantEnvido'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);
    const chant = params.chant;

    return new ChantEnvidoCommmand(state, player, chant).execute();
  }

  /**
   * Respond an Envido chant during a game
   *
   * @private
   * @param {ActionParams['respondEnvido']} params - The params needed to respond a chant of envido
   * @returns {GameState} - The new state of the game of Truco
   */
  private respondEnvido(
    state: GameState,
    params: ActionParams['respondEnvido'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);
    const accepted = params.accepted;

    return new RespondEnvidoCommmand(state, player, accepted).execute();
  }

  /**
   * Plays the cards during an Envido Play
   *
   * @private
   * @param {ActionParams['playCard']} params - The params with the cards and the user who is playing
   * @returns {GameState} - The new state of the game of Truco
   */
  private playEnvido(
    state: GameState,
    params: ActionParams['playEnvido'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);
    const cards = [CardFactory.from(params.cardsCodes[0])];

    if (params.cardsCodes.length > 1) {
      cards.push(CardFactory.from(params.cardsCodes[1]));
    }

    return new PlayEnvidoCommand(state, player, cards).execute();
  }

  /**
   * Chants a Level of Truco during a game
   *
   * @private
   * @param {ActionParams['chantTruco']} params - The params with the level of truco and the player who is chanting
   * @returns {GameState} - The new state of the game of Truco
   */
  private chantTruco(
    state: GameState,
    params: ActionParams['chantTruco'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);

    return new ChantTrucoCommmand(state, player, params.trucoLevel).execute();
  }

  /**
   * Respond an Truco chant during a game
   *
   * @private
   * @param {ActionParams['respondTruco']} params - The params with the answer to the chant and the player
   * @returns {GameState} - The new state of the game of Truco
   */
  private respondTruco(
    state: GameState,
    params: ActionParams['respondTruco'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);

    return new RespondTrucoCommmand(state, player, params.accepted).execute();
  }

  /**
   * Chants a Level of Flor in a game of Truco
   *
   * @private
   * @param {ActionParams['chantFlor']} params - The params with the flor level and the player chanting
   * @returns {GameState} - The new state of the game of Truco
   */
  private chantFlor(
    state: GameState,
    params: ActionParams['chantFlor'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);

    return new ChantFlorCommand(state, player, params.florLevel).execute();
  }

  /**
   * Responds a Flor chant in a game of Truco
   *
   * @private
   * @param {ActionParams['respondFlor']} params - The params with the Flor response and the player
   * @returns {GameState} - The new state of the game of Truco
   */
  private respondFlor(
    state: GameState,
    params: ActionParams['respondFlor'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);

    return new RespondFlorCommand(state, player, params.accepted).execute();
  }

  /**
   * Plays the cards during a Flor play in a game of Truco
   *
   * @private
   * @param {ActionParams['playFlor']} params - The params with the cards to play and the player
   * @returns {GameState} - The new state of the game of Truco
   */
  private playFlor(
    state: GameState,
    params: ActionParams['playFlor'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);
    const cards = [
      CardFactory.from(params.cardsCodes[0]),
      CardFactory.from(params.cardsCodes[1]),
      CardFactory.from(params.cardsCodes[2]),
    ];

    return new PlayFlorCommand(state, player, cards).execute();
  }

  /**
   * Goes to deck in the current hand of a game of Truco
   *
   * @private
   * @param {ActionParams['goToDeck']} params - The params with the player that goes to deck
   * @returns {GameState} - The new state of the game of Truco
   */
  private goToDeck(
    state: GameState,
    params: ActionParams['goToDeck'],
  ): GameState {
    const player = state.hand.getPlayer(params.player);
    return new GoToDeckCommand(state, player).execute();
  }
}
