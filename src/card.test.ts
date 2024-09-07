import { Card } from './card';
import { describe, test, expect } from "@jest/globals"

describe('Card compareTo()', () => {
	test('1E is stronger than 1B', () => {

		let card1 = new Card("1", "E");
		let card2 = new Card("1", "B");

		expect(card1.compareTo(card2)).toEqual(1);
	})
	test('3B is weaker than 1B', () => {

		let card1 = new Card("3", "B");
		let card2 = new Card("1", "B");

		expect(card1.compareTo(card2)).toEqual(-1);
	})
	test('4C is the same value as 4O', () => {

		let card1 = new Card("4", "C");
		let card2 = new Card("4", "O");

		expect(card1.compareTo(card2)).toEqual(0);
	})
})


