import { HandPhase, Team, TrucoLevel } from '../types';
import { Card } from './card';
import { Deck } from './deck';
import { Envido } from './envido';
import { Flor } from './flor';
import { Player } from './player';
import { Round } from './round';
import { Turn } from './turn';

/**
 * Represents a Hand during a game of Truco
 *
 * @class Hand
 * @description A class that represent a round of the game in which the cards are deat to all players and they play the cards until there is a winner
 */
export class Hand {
  /**
   * Creates a new Hand instance
   *
   * @param {Deck} deck - The deck of cards to deal the cards
   * @param {Player[]} players - The players during the hand
   * @param {Round[]} rounds - The 3 rounds to play the cards during the hand
   * @param {Envido} envido - The envido play during the hand
   * @param {Turn} turns - The current turns to play the different plays of the hand
   * @param {HandPhase} phase - The current phase of the hand
   * @param {TrucoLevel} trucoLevel - The current level of Truco chanted so far
   * @param {Flor} flor - Optional flor play if the hand/game rules are setted with flor
   */
  constructor(
    public deck: Deck,
    public players: Player[],
    public rounds: Round[],
    public envido: Envido,
    public turns: Turn,
    public phase: HandPhase,
    public trucoLevel: TrucoLevel = TrucoLevel.NotChanted,
    public flor?: Flor,
  ) {}

  /**
   * Returns the current round based on the cards played so for
   *
   * @returns {number} - The current round number
   */
  get currentRound(): number {
    for (let i = 0; i < 3; i++) {
      if (!this.rounds[i].isFinished()) {
        return i;
      }
    }
    return 2;
  }

  /**
   * Plays a card on the current round of the hand
   *
   * @param {Player} player - The player who is playing the card
   * @param {Card} card - The card object he is playing in the current hand
   */
  public playCard(player: Player, card: Card): void {
    const currentRound = this.rounds[this.currentRound];
    currentRound.playCard(player, card);
    this.turns.nextTurn();

    if (currentRound.isFinished()) {
      const winner = currentRound.winner()!;
      this.turns.setTurns(winner[0]);
    }
  }

  /**
   * Returns the winner Team of the hand or undefined if not finished
   *
   * @returns {Team|undefined} - The winner based on the cards played during the hand
   */
  public winner(): Team | undefined {
    const roundWinners = this.rounds.map((round) => round.winner());

    const roundsWinnedByTeam = roundWinners.reduce(
      (score, winners) => {
        winners?.forEach((winner) => (score[winner.team] += 1));
        return score;
      },
      [0, 0],
    );

    if (
      roundsWinnedByTeam[Team.A] === roundsWinnedByTeam[Team.B] &&
      roundsWinnedByTeam[Team.A] === 3
    ) {
      return this.turns.handPlayer?.team;
    }

    if (
      roundsWinnedByTeam[Team.A] > roundsWinnedByTeam[Team.B] &&
      roundsWinnedByTeam[Team.A] >= 2
    ) {
      return Team.A;
    }
    if (
      roundsWinnedByTeam[Team.B] > roundsWinnedByTeam[Team.A] &&
      roundsWinnedByTeam[Team.B] >= 2
    ) {
      return Team.B;
    }

    return undefined;
  }

  /**
   * Returns a player based on the index of the player's array
   *
   * @param {number} number - The number of the player to get
   * @returns {Player} - The player object
   */
  public getPlayer(number: number): Player {
    if (number > this.players.length - 1 || number < 0) {
      throw Error('Invalid player');
    }

    return this.players.find((p) => p.id === number)!;
  }

  /**
   * Deals all cards for the players in the hand
   */
  public dealCards(): void {
    const cards = this.deck.dealCards(this.players.length);

    for (let i = 0; i < this.players.length; i++) {
      this.players[i].cards = cards.splice(0, 3);
    }
  }

  /**
   * Returns the encoded string of the cards played during all the rounds in the hand
   *
   * @returns {string} - The string code of the cards played during the hand
   */
  public serialize(): string {
    const cards = this.rounds.reduce(
      (handCards, round) => handCards + round.serialize() + '-',
      '',
    );

    return cards.slice(0, cards.length - 1);
  }
}
