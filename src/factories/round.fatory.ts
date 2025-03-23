import { Card } from '../models/card';
import { Player } from '../models/player';
import { Round } from '../models/round';
import { CardFactory } from './card.factory';

/**
 * A factory for creating Round objects
 *
 * @class RoundFactory
 * @description Creates Round objects to handle the cards played by players during a Hand of Truco
 */
export class RoundFactory {
  /**
   * A regex matcher to get cards codes from a serialized string of cards played
   *
   * @static
   */
  private static readonly cardsPerPlayerPerRoundMatcher = /0|[1-9]\d?[A-Z]/g;

  /**
   * Returns an array of Rounds with the players passed for a Hand of Truco
   *
   * @static
   * @param {Player[]} - The players of the rounds
   * @returns {Round[]} - The rounds of the Hand
   */
  public static createRounds(players: Player[]): Round[] {
    return [
      new Round(new Map<Player, Card>(), players),
      new Round(new Map<Player, Card>(), players),
      new Round(new Map<Player, Card>(), players),
    ];
  }

  /**
   * Returns an array of Rounds with the cards player on each Round
   *
   * @static
   * @param {string} serializedPlayedCards - The serialized string of the cards played during the round
   * @param {Player[]} players - The players participating on the round
   * @returns {Round[]} - The rounds of the Hand
   */
  public static from(
    serializedPlayedCards: string,
    players: Player[],
  ): Round[] {
    return serializedPlayedCards
      .split('-')
      .map((cardsPerRound) => this.deserializeRound(cardsPerRound, players));
  }

  /**
   * Returns a Round with the cards played
   *
   * @private
   * @static
   * @param {string} cardsPerRound - The serialized string of the cards played in the round
   * @param {Player[]} players - The players participating on the round
   * @returns {Round[]} - The round
   */
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
