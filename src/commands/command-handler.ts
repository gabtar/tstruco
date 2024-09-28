import { CardFactory } from '../factories/card.factory';
import { GameState } from '../models/game-state';
import { ActionParams } from '../types';
import { NewGameCommand } from './new-game-command';
import { NewHandCommand } from './new-hand-command';
import { PlayCardCommand } from './play-card-command';

export class CommandHandler {
  handle<K extends keyof ActionParams>(
    actionType: K,
    params: ActionParams[K],
    state: GameState,
  ): GameState {
    switch (actionType) {
      case 'playCard':
        return this.playCard(params as ActionParams['playCard'], state);
      case 'newGame':
        return this.newGame(params as ActionParams['newGame']);
      case 'newHand':
        return this.newHand(state);
      default:
        throw Error('Invalid action!');
    }
  }

  private playCard(
    params: ActionParams['playCard'],
    state: GameState,
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
    return (new NewHandCommand(state)).execute()

  }

}

// Commands / Actions
// Play card - Player, Card, Hand
// Chant envido - Player, Envido Level
// Raise envido - Player, Envido Level
// Response to envido - Player, Accept/Decline
// New hand command
