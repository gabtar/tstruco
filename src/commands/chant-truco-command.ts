import { GameState } from '../models/game-state';
import { Player } from '../models/player';
import { HandPhase, TrucoLevel } from '../types';
import { Command } from './play-card-command';

export class ChantTrucoCommmand implements Command {
  constructor(
    private state: GameState,
    private player: Player,
    private chant: TrucoLevel,
  ) {}

  public execute(): GameState {
    if (!this.canChantTruco()) {
      throw Error('Not your turn!');
    }

    if (this.chant <= this.state.hand.trucoLevel) {
      throw Error('Invalid Truco Level');
    }

    this.state.hand.trucoLevel = this.chant;
    this.state.hand.phase = HandPhase.ChantTruco;
    this.state.hand.turns.responseTrucoChantTurn = this.player.opponentTeam();

    return this.state;
  }

  private canChantTruco(): boolean {
    const responseTrucoChantTurn = this.state.hand.turns.responseTrucoChantTurn;

    if (responseTrucoChantTurn === undefined) {
      return true;
    }

    return responseTrucoChantTurn == this.player.team;
  }
}
