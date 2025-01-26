import { CommandHandler } from '../commands/command-handler';
import { GameStateFactory } from '../factories/game-state.factory';
import { ActionParams, GameStatus } from '../types';
import { GameState } from './game-state';

export class Truco {
  constructor(
    private state: GameState = GameStateFactory.createGame({
      numberOfPlayers: 2,
      flor: false,
      maxPoints: 15,
    }),
    private handler: CommandHandler = new CommandHandler(),
  ) { }

  action<K extends keyof ActionParams>(
    actionType: K,
    params: ActionParams[K],
  ): void {
    this.state = this.handler.handle(actionType, params, this.state);
  }

  status(): GameStatus {
    const rules = (this.state.rules.flor ? "F" : "") + this.state.rules.maxPoints;
    const cardsDealt = this.state.hand.players.reduce((cards, player) => cards + player.serializeCards(), "");
    const flor = this.state.hand.flor;
    const trucoChantCode = ["N", "T", "R", "V"];
    const gamePhaseCode = {
      "TRUCO": "T",
      "CHANT_TRUCO": "CT",
      "CHANT_ENVIDO": "CE",
      "PLAY_ENVIDO": "PE",
      "CHANT_FLOR": "CF",
      "PLAY_FLOR": "PF",
    }

    return {
      rules: rules,
      players: "" + this.state.rules.numberOfPlayers,
      cardsDealt: cardsDealt,
      envido: this.state.hand.envido.serialize(),
      flor: flor ? flor.serialize() : "",
      truco: trucoChantCode[this.state.hand.trucoLevel],
      cardsPlayed: this.state.hand.serialize(),
      turns: this.state.hand.turns.serialize(),
      score: this.state.score.serialize(),
      gamePhase: gamePhaseCode[this.state.hand.phase],
    }
  }
}
