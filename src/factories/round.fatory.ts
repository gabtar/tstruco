import { Card } from '../models/card';
import { Player } from '../models/player';
import { Round } from '../models/round';
import { CardFactory } from './card.factory';

export class RoundFactory {
  private static readonly cardsPerPlayerPerRoundMatcher = /0|[1-9]\d?[A-Z]/g;

  /*
   * createRound creates the round for the players
   */
  public static createRounds(players: Player[]): Round[] {
    return [
      new Round(new Map<Player, Card>(), players),
      new Round(new Map<Player, Card>(), players),
      new Round(new Map<Player, Card>(), players),
    ];
  }

  /*
   * returns an array of rounds with the cards played by players in the serialized cards played string
   */
  public static from(
    serializedPlayedCards: string,
    players: Player[],
  ): Round[] {
    return serializedPlayedCards
      .split('-')
      .map((cardsPerRound) => this.deserializeRound(cardsPerRound, players));
  }

  private static deserializeRound(
    cardsPerRound: string,
    players: Player[],
  ): Round {
    const round = new Round(new Map<Player, Card>(), players);
    cardsPerRound
      .match(this.cardsPerPlayerPerRoundMatcher)!
      .forEach(
        (cardCode, playerIndex) =>
          cardCode !== '0' &&
          round.playCard(players[playerIndex], CardFactory.from(cardCode)),
      );
    return round;
  }
}
