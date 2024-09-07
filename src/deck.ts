import { Card, Ranks, Suits } from "./card";

export class Deck {
    cards: Card[] = []

    constructor() {
        for (let rank in Ranks) {
            for (let suit in Suits) {
                this.cards.push(new Card(rank, suit));
            }
        }
    }

    count(): number {
        return this.cards.length;
    }

}