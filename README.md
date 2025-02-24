# TSTruco

<div align="center">

![Statements](badges/badge-statements.svg)
![Branches](badges/badge-branches.svg)
![Functions](badges/badge-functions.svg)
![Lines](badges/badge-lines.svg)


</div>

# WIP

## TODO: 
- [ ] Use remaining score when playing falta envido and more than 15 points
- [ ] Validate the card has been dealt to player when he plays a card
- [ ] FIX: Only the players who have a flor should play it
- [ ] FIX: Add envido score if wasnt chanted when going to deck
- [ ] If all players go to deck, end and reset the hand
- [ ] When flor is chanted, disable envido chant....
- [ ] Check how to implement when one player dont play a flor or an envido and he says 'son buenas'(maybe play w/ empty/no cards)
- [ ] When no card is played in envido by a player we will asume that the player pass by saying "son buenas" / pass the envido play. So either cards of the envido pair should be optionals
- [ ] Chant envido during a truco chant, if envido is available
- [ ] Error handling w/ custom exceptions

## Commands:

- [x] Play Flor command
- [x] Go To Deck command

## Serialization

**tstruco** uses a custom serialization system to encode game status into one single string. The system is described [here](SERIALIZATION.md)

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
