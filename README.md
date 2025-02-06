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


## Commands:

- [x] Play Flor command
    - [ ] FIX: Only the players who have a flor should play it
- [x] Go To Deck command
    - [ ] FIX: Add envido score if wasnt chanted...

## Posible bugfixes
- [ ] When flor is chanted, disable envido chant....
- [ ] When no card is played in envido by a player we will asume that the player pass by saying "son buenas" / pass the envido play. So either cards of the envido pair should be optionals
- [x] New Hand action/command sets wrong turns


## Game Api Usage

```
import { Truco } from './models/truco';

const truco = new Truco();

```

| Action        | Usage                                   | Params                                                                     |
| -----------   | --------------------------------------- | -------------------------------------------------------------------------- |
| newGame       | truco.action('newGame', params)         | { rules: { numberOfPlayers: number, maxPoints: number, flor: boolean } }   |
| newHand       | truco.action('newHand', {})             |        -                                                                   |
| playCard      | truco.action('playCard', parms)         | { player: number, cardCode: string }                                       |
| chantEnvido   | truco.action('chantEnvido', params)     | { player: number, chant: number }                                          |
| respondEnvido | truco.action('respondEnvido', params)   | { player: number, accepted: boolean }                                      |
| playEnvido    | truco.action('playEnvido', params)      | { player: number, cardsCode: string }                                      |
| chantTruco    | truco.action('chantTruco', params)      | { player: number, trucoLevel: number }                                     |
| respondTruco  | truco.action('respondTruco', params)    | { player: number, accepted: boolean }                                      |
| chantFlor     | truco.action('chantFlor', params)       | { player: number, florLevel: number }                                      |
| respondFlor   | truco.action('respondFlor', params)     | { player: number, accepted: boolean }                                      |
| playFlor      | truco.action('playFlor', params)        | { player: number, cardsCodes: string }                                     |
| goToDeck      | truco.action('goToDeck', params)        | { player: number }                                                         |
