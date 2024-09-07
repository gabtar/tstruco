import { Deck } from "./deck";

describe('Deck count', () => {
	test('Deck has 40 cards', () => {
        let deck = new Deck();

		expect(deck.count()).toEqual(40);
	})
})

