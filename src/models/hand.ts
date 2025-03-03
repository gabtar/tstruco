import { GamePhase, Team, TrucoLevel } from '../types';
import { Card } from './card';
import { Deck } from './deck';
import { Envido } from './envido';
import { Flor } from './flor';
import { Player } from './player';
import { Round } from './round';
import { Turn } from './turn';

export class Hand {
  constructor(
    public deck: Deck,
    public players: Player[],
    public rounds: Round[],
    public envido: Envido,
    public turns: Turn,
    public phase: GamePhase,
    public trucoLevel: TrucoLevel = TrucoLevel.NotChanted,
    public flor?: Flor,
  ) { }

  /*
   * currentRound
   * Returns the current round based on the cards played so for
   */
  get currentRound(): number {
    for (let i = 0; i < 3; i++) {
      if (!this.rounds[i].isFinished()) {
        return i;
      }
    }
    return 2;
  }

  /* playCard
   * Plays a card on the current round of the hand
   */
  playCard(player: Player, card: Card): void {
    const currentRound = this.rounds[this.currentRound];
    currentRound.playCard(player, card);
    this.turns.nextTurn();

    if (currentRound.isFinished()) {
      const winner = currentRound.winner()!;
      this.turns.setTurns(winner[0]);
    }
  }

  /*
   * winner
   * Returns the winner of the hand or undefined if not finished
   * */
  winner(): Team | undefined {
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

  /*
   * getPlayer
   * Returns a player based on the index of the player's array
   */
  getPlayer(number: number): Player {
    if (number > this.players.length - 1 || number < 0) {
      throw Error('Invalid player');
    }

    return this.players[number];
  }

  /*
   * dealCards
   * Deals all cards for the players in the hand
   */
  dealCards(): void {
    const cards = this.deck.dealCards(this.players.length);

    for (let i = 0; i < this.players.length; i++) {
      this.players[i].cards = cards.splice(0, 3);
    }
  }

  /*
   * serialize
   * Returns the encoded string of the cards played during all the rounds in the hand
   */
  public serialize(): string {
    const cards = this.rounds.reduce(
      (handCards, round) => handCards + round.serialize() + '-',
      '',
    );

    return cards.slice(0, cards.length - 1);
  }
}
