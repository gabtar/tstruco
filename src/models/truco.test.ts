import { CommandHandler } from "../commands/command-handler";
import { GameStateFactory } from "../factories/game-state.factory";
import { Truco } from "./truco";
jest.mock('../commands/command-handler.ts'); // command-handler mock

const CommandHandlerMock = CommandHandler as jest.MockedClass<typeof CommandHandler>;

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
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
