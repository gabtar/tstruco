import { EnvidoLevel } from '../types';
import { Card } from './card';

export class Envido {
  constructor(
    public cardsPlayed: Map<number, Card[]> = new Map<number, Card[]>(),
    public chanted: EnvidoLevel[] = [],
    public accepted?: boolean,
  ) { }

  addChant(chant: EnvidoLevel) {
    if (this.isValidEnvidoLevel(chant)) {
      throw Error(`Cannot chant ${EnvidoLevel[chant]}!`);
    }

    this.chanted.push(chant);
  }

  playCards(playerNumber: number, cards: Card[]) {
    this.cardsPlayed.set(playerNumber, cards);
  }

  private isValidEnvidoLevel(chant: EnvidoLevel): boolean {
    return (
      this.chanted[this.chanted.length - 1] != EnvidoLevel.Envido &&
      chant < this.chanted[this.chanted.length - 1]
    );
  }
}
