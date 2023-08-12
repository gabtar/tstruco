export type Card = {
  rank: Rank
  suit: Suit
}

export type Player = {
  name: string
  cards: Card[]
}

export type Suit = 'ESPADA' | 'BASTO' | 'ORO' | 'COPA';

export type Rank = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '10' | '11' | '12';
