export class Card {
	rank: string
	suit: string

	constructor(rank: string, suit: string) {
		this.rank = rank;
		this.suit = suit;
	}

	toString(): string {
		return this.rank + this.suit;
	}

	/*
	* compareTo returns if the other card is greater than(+1), equal(0) or lower(-1) than current card
	*/
	compareTo(other: Card): number {
		if(this.value() > other.value()) {
			return 1;
		} else if (this.value() < other.value()) {
			return -1;
		}
		return 0;
	}

	private value(): number {
		return CardValues.get(this.toString()) || 0;
	}
}

export const Suits = ["B" , "E" , "C" , "O"];
export const Ranks = ["1" , "2" , "3" , "4" , "5" , "6" , "7" , "10" , "11" , "12"];

const CardValues = new Map<string, number>([
	["1E", 13],
	["1B", 12],
	["7E", 11],
	["7O", 10],
	["3E", 9], ["3B", 9], ["3O", 9], ["3C", 9],
	["2E", 8], ["2B", 8], ["2O", 8], ["2C", 8],
	["1O", 7], ["1C", 7],
	["12E", 6], ["12B", 6], ["12O", 6], ["12C", 6],
	["11E", 5], ["11B", 5], ["11O", 5], ["11C", 5],
	["10E", 4], ["10B", 4], ["10O", 4], ["10C", 4],
	["7B", 3], ["7C", 3],
	["6E", 2], ["6B", 2], ["6O", 2], ["6C", 2],
	["5E", 1], ["5B", 1], ["5O", 1], ["5C", 1],
	["4E", 0], ["4B", 0], ["4O", 0], ["4C", 0],
]);