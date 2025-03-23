import { CommandHandler } from '../commands/command-handler';
import { GameStateFactory } from '../factories/game-state.factory';
import { ActionParams } from '../types';
import { GameState } from './game-state';

/**
 * Represents a game of Truco
 *
 * @class Truco
 * @description A class to interact with the whole game of Truco with all its phases, according to the rules of the game
 */
export class Truco {
  /**
   * Creates a new instance of Truco with a default 2 player game
   *
   * @param {GameState} state - A GameState object that holds the state of the game
   * @param {CommandHandler} handler - A command handler to perform actions during the game
   */
  constructor(
    private state: GameState = GameStateFactory.createGame({
      numberOfPlayers: 2,
      flor: false,
      maxPoints: 15,
    }),
    private handler: CommandHandler = new CommandHandler(),
  ) {}

  /**
   * Perfroms an action/command during a game of Truco
   *
   * @param {keyof ActionParams} actionType - The type of action to be performed
   * @param {ActionParams} params - The params needed to perform the action on the game
   */
  action<K extends keyof ActionParams>(
    actionType: K,
    params: ActionParams[K],
  ): void {
    this.state = this.handler.handle(actionType, params, this.state);
  }

  /**
   * Returns the encoded string of the full game of Truco
   *
   * @returns {string} - The string representing the actual game
   */
  serialize(): string {
    const rules =
      (this.state.rules.flor ? 'F' : '') + this.state.rules.maxPoints;
    const cardsDealt = this.state.hand.players.reduce(
      (cards, player) => cards + player.serializeCards(),
      '',
    );
    const flor = this.state.hand.flor ? this.state.hand.flor.serialize() : '';
    const trucoChantCode = ['N', 'T', 'R', 'V'];
    const gamePhaseCode = {
      PLAY_TRUCO: 'T',
      CHANT_TRUCO: 'CT',
      CHANT_ENVIDO: 'CE',
      PLAY_ENVIDO: 'PE',
      CHANT_FLOR: 'CF',
      PLAY_FLOR: 'PF',
    };

    return (
      rules +
      '#' +
      this.state.rules.numberOfPlayers +
      '#' +
      cardsDealt +
      '#' +
      this.state.hand.envido.serialize() +
      '#' +
      flor +
      '#' +
      trucoChantCode[this.state.hand.trucoLevel - 1] +
      '#' +
      this.state.hand.serialize() +
      '#' +
      this.state.hand.turns.serialize() +
      '#' +
      this.state.score.serialize() +
      '#' +
      gamePhaseCode[this.state.hand.phase]
    );
  }

  /**
   * Creates a new Truco instance from the encoded string passed
   *
   * @param {string} serializedGame - The encoded string of a previously serialized game of Truco
   * @returns {Truco} - The game instance
   */
  public static from(serializedGame: string) {
    return new Truco(GameStateFactory.from(serializedGame));
  }
}
