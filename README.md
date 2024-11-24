# TSTruco

<div align="center">

![Jest coverage](badges/coverage-jest%20coverage.svg)
![Statements](badges/coverage-statements.svg)
![Branches](badges/coverage-branches.svg)
![Functions](badges/coverage-functions.svg)
![Lines](badges/coverage-lines.svg)


</div>

# WIP

## Game - ideas

- [x] Game object with public api for play during the game.
- [x] Refactoring to a Score object and make tests *
- [ ] Improve turn system for envido/flor/truco and chants
- [ ] Serialize object - JSON? or a string code, eg 0123Player1E2BCards...


## Commands:

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
- [x] Chant Flor command
- [x] Response to Flor command
- [x] Play Flor command
    - [ ] FIX: Only the players who have a flor should play it
- [ ] Go To Deck command

## Posible bugfixes
- [ ] When flor is chanted, disable envido chant....


## Game Api Usage

```
import { Truco } from './models/truco';

const truco = new Truco();

```

| Action        | Usage                                   | Params                                                                     |
| -----------   | --------------------------------------- | -------------------------------------------------------------------------- |
| newGame       | truco.action('newGame', params)         | { rules: { numberOfPlayers: number, maxPoints: number, flor: boolean } }   |
| newHand       | truco.action('newHand', {})             |        -                                                                   |
| playCard      | truco.action('playCard', parms)         | { player: number, cardsCodes: string[] }                                       |
| chantEnvido   | truco.action('chantEnvido', params)     | { player: number, chant: number }                                          |
| respondEnvido | truco.action('respondEnvido', params)   | { player: number, accepted: boolean }                                      |
| playEnvido    | truco.action('playEnvido', params)      | { player: number, cardsCode: string }                                      |
| chantTruco    | truco.action('chantTruco', params)      | { player: number, trucoLevel: number }                                     |
| respondTruco  | truco.action('respondTruco', params)    | { player: number, accepted: boolean }                                      |
| chantFlor     | truco.action('chantFlor', params)       | { player: number, florLevel: number }                                      |
| respondFlor   | truco.action('respondFlor', params)     | { player: number, accepted: boolean }                                      |
| playFlor      | truco.action('playFlor', params)        | { player: number, cardsCodes: string[] }                                      |
