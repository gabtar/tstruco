import { Card } from './card';

export class Player {
  constructor(
    public id: number,
    public team: string,
    public cards: Card[],
  ) {}
}
