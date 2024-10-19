import { CardFactory } from '../factories/card.factory';
import { EnvidoPairFactory } from '../factories/envido-pair.factory';

describe('#score', () => {
  const card1E = CardFactory.from('1E');
  const card7E = CardFactory.from('7E');
  const card12C = CardFactory.from('12C');

  it('Should return the highest card rank when have diferent suits', () => {
    const envidoPair = EnvidoPairFactory.createEnvidoPair(card1E, card12C);

    expect(envidoPair.score()).toBe(1);
  });

  it('Should return the sum of ranks plus 20 when cards are of the same suit', () => {
    const envidoPair = EnvidoPairFactory.createEnvidoPair(card1E, card7E);

    expect(envidoPair.score()).toBe(28);
  });
});
