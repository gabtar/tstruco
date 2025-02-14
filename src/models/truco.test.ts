import { CommandHandler } from '../commands/command-handler';
import { GameStateFactory } from '../factories/game-state.factory';
import { Truco } from './truco';
jest.mock('../commands/command-handler.ts'); // command-handler mock

const CommandHandlerMock = CommandHandler as jest.MockedClass<
  typeof CommandHandler
>;

beforeEach(() => {
  CommandHandlerMock.mockClear();
});

describe('#action', () => {
  const state = GameStateFactory.createGame({
    numberOfPlayers: 2,
    flor: true,
    maxPoints: 15,
  });
  const commandHandlerMock = new CommandHandlerMock();
  const truco = new Truco(state, commandHandlerMock);

  it('Should call the handler with newHand', () => {
    truco.action('newHand', {});

    expect(commandHandlerMock.handle).toHaveBeenCalledTimes(1);
  });
});

describe('#serialize', () => {
  const state = GameStateFactory.createGame({
    numberOfPlayers: 2,
    flor: true,
    maxPoints: 15,
  });
  const commandHandlerMock = new CommandHandlerMock();
  const truco = new Truco(state, commandHandlerMock);

  it('Should return 10 segments of encoded strings separated by the # character', () => {
    expect(10).toBe(truco.serialize().split('#').length);
  });
});

describe('#from', () => {
  it('Should return the same serialization string when deserializing', () => {
    const truco = new Truco();
    const deserialized = Truco.from(truco.serialize());

    expect(deserialized.serialize()).toBe(truco.serialize());
  });
});
