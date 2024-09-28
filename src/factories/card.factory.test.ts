import { CardFactory } from "./card.factory";

describe('CardFactory #createCard', () => {

  it('Should create an 1 of spades', () => {
    const card = CardFactory.from('1E');

    expect(card.value()).toBe(13);
    expect(card.rank).toBe('1');
    expect(card.suit).toBe('E');
  });

  it('Should throw an error if card code is invalid', () => {
    const card = CardFactory.from('ZZ');

    // TODO: ......

  });
});
