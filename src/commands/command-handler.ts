import { CardFactory } from '../factories/card.factory';
import { GameState } from '../models/game-state';
import { Action, ActionRequest } from '../types';
import { PlayCardCommand } from './play-card-command';

export class CommandHandler {
  handle(
    actionType: Action,
    actionRequest: ActionRequest,
    state: GameState,
  ): void {
    switch (actionType) {
      case 'PLAY_CARD':
        const player = state.hand.getPlayer(actionRequest.player);
        const card = CardFactory.from(actionRequest.card!);

        new PlayCardCommand(state.hand, player, card).execute();
        break;

      default:
        throw Error('Invalid action!');
    }
  }
}

// Commands / Actions
// Play card - Player, Card, Hand
// Chant envido - Player, Envido Level
// Raise envido - Player, Envido Level
// Response to envido - Player, Accept/Decline
// New hand command
