export type Card = {
  rank: string
  suit: string
}

export type Player = {
  name: string
  cards: Card[]
}

export type Round = Map<Player, Card>

