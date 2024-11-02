# TSTruco

<div align="center">

![Jest coverage](badges/coverage-jest%20coverage.svg)
![Statements](badges/coverage-statements.svg)
![Branches](badges/coverage-branches.svg)
![Functions](badges/coverage-functions.svg)
![Lines](badges/coverage-lines.svg)


</div>

# WIP

# Game - ideas

- [x] Game object with public api for play during the game.
- [x] Refactoring to a Score object and make tests *
- [ ] Serialize object - JSON? or a string code, eg 0123Player1E2BCards...

# Commands:

- [x] Play card command
    - [x] TODO: play a card that ends the round/hand/game
    - [x] Update turns of the next round. The winner of the previous round should start playing a card.
- [x] New Game command
- [x] New Hand command
- [x] Chant Envido command
- [x] Respond Envido command - Accept/Decline
- [x] Play Envido command
- [x] Chant Truco command
- [x] Respond Truco command
- [ ] Chant Flor command
- [ ] Raise Flor command
- [ ] Response to Flor command
- [ ] Play Flor command
- [ ] Go To Deck command


## Game Api Usage

```
import { Truco } from './models/truco';

const truco = new Truco();

```

| Action        | Usage                                   | Params           |
| -----------   | --------------------------------------- | ---------------- |
| newGame       | truco.action('newGame', params)         | { rules: { numberOfPlayers: number, maxPoints: number, flor: boolean } }        |
| newHand       | truco.action('newHand', {})             |        -         |
| playCard      | truco.action('playCard', parms)         | { player: number, cardCode: string }                 |
| chantEnvido   | truco.action('chantEnvido', params)     | { player: number, chant: number }                 |
| respondEnvido | truco.action('respondEnvido', params)   | { player: number, accepted: boolean }                 |
| playEnvido | truco.action('playEnvido', params)   | { player: number, cardsCode: string }                 |
| chantTruco | truco.action('chantTruco', params)   | { player: number, trucoLevel: number }                 |
| respondTruco | truco.action('respondTruco', params)   | { player: number, accepted: boolean }                 |
