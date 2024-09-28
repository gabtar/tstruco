import { HandFactory } from "../factories/hand.factory";
import { GameState } from "../models/game-state";

export class NewHandCommand {
  constructor(private state: GameState) { }

  public execute(): GameState {
    const handPlayer = this.state.hand.handPlayer;
    const numberOfPlayers = this.state.rules.numberOfPlayers;

    const nextHandPlayer = handPlayer === numberOfPlayers - 1 ? 0 : handPlayer + 1;

    const newHand = HandFactory.createHand(this.state.hand.players);
    newHand.handPlayer = nextHandPlayer;
    newHand.dealCards();

    // TODO: update turns in the hand, extract to method passing the player...
    newHand.turns.playCardTurn = newHand.players[nextHandPlayer];
    newHand.turns.chantTrucoTurn = newHand.players[nextHandPlayer];
    newHand.turns.chantEnvidoTurn = newHand.players[nextHandPlayer];

    this.state.hand = newHand;

    return this.state;
  }
}
