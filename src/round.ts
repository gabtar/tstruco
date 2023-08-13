import { Card, Player } from "./types";

export class Round {
  constructor(
    private _cardsPlayed: Map<Player, Card> = new Map<Player, Card>(),
  ) { }

  cardPlayed(player: Player): Card | undefined {
    return this._cardsPlayed.get(player);
  }

  playCard(player: Player, card: Card): void {
    const played = this._cardsPlayed.get(player);

    if (played) {
      throw new Error('Ya jugaste una carta');
    }

    this._cardsPlayed.set(player, card);
  }

  isFinished(): boolean {
    // TODO: fix for multiple players. Perhaps a numberOfPlayers field?
    return this._cardsPlayed.size == 2 ? true : false;
  }

  winner(): Player[] | null {
    if(!this.isFinished()) { return null }

    const highestValue = Math.max(...Array.from(this._cardsPlayed.values())
      .map(card => CardValue.get(cardCode(card))!))

    return Array.from(this._cardsPlayed.keys()).filter(
      player => CardValue.get(cardCode(this._cardsPlayed.get(player)!)) == highestValue
    )
  }
}

/** Para calcular el valor de las cartas */
const cardCode = (card: Card): string => card.rank+card.suit

/** Maps a card code to card value in truco */
const CardValue: Map<string, number> = new Map<string, number>(
  [
    ['1ESPADA', 13],
    ['1BASTO', 12],
    ['7ESPADA', 11],
    ['7ORO', 10],
    ['3ORO', 9],
    ['3COPA', 9],
    ['3ESPADA', 9],
    ['3BASTO', 9],
    ['2ORO', 8],
    ['2COPA', 8],
    ['2ESPADA', 8],
    ['2BASTO', 8],
    ['1ORO', 7],
    ['1COPA', 7],
    ['12ORO', 6],
    ['12COPA', 6],
    ['12ESPADA', 6],
    ['12BASTO', 6],
    ['11ORO', 5],
    ['11COPA', 5],
    ['11ESPADA', 5],
    ['10BASTO', 5],
    ['10ORO', 4],
    ['10COPA', 4],
    ['10ESPADA', 4],
    ['10BASTO', 4],
    ['7COPA', 3],
    ['6ORO', 2],
    ['6COPA', 2],
    ['6ESPADA', 2],
    ['6BASTO', 2],
    ['5ORO', 1],
    ['5COPA', 1],
    ['5ESPADA', 1],
    ['5BASTO', 1],
    ['4ORO', 0],
    ['4COPA', 0],
    ['4ESPADA', 0],
    ['4BASTO', 0],
  ]
);
