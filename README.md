# tstruco

tstruco is a typescript library for playing games of [Truco](https://en.wikipedia.org/wiki/Truco). It's a popular card game on South America and particulary in Argetina. 

<div align="center">

![Statements](badges/badge-statements.svg)
![Branches](badges/badge-branches.svg)
![Functions](badges/badge-functions.svg)
![Lines](badges/badge-lines.svg)

</div>

## Setup, instalation and sample usage

Create a new javascript/typescript project and install the library from the npm registry.

```
npm install tstruco
```
 
Sample code to play a game

```javascript
import { Truco } from 'tstruco';
// or use: "const { Truco } = require('tstruco');" to import as a CommonJS module in javascript

const truco = new Truco();

truco.action('newGame', { rules: { numberOfPlayers: 2, flor: false, maxPoints: 15 } }); // starts a new game with the rules passed
truco.action('newHand', {}); // starts a new hand and deals the cards for all players 

console.log(truco.serialize());  // displays the serialized game string w/ current game state
// eg. Outputs: 15#2#1E3C11C12E2E6C#N##N#00-00-00#H0C0--P0---#A0B0#T 
// '1E3C11C12E2E6C' this is the serialized cards dealt section. As we see, player 0 has recived the 1E(Ace of Spades in spanish deck) card

truco.action('playCard', { player: 0, card: '1E' }); // player 0 plays el 'Ancho de Espadas'(1E) in the first round of the hand

console.log(truco.serialize());  // the new serialized game string displays the that the first player played 1E card on the first round
// Outputs: 15#2#1E3C11C12E2E6C#N##N#1E0-00-00#H0C0--P0---#A0B0#T
// '1E0-00-00' this is the cards played section. It now shows that player 0 has played the '1E' card during the first round

```

## Serialization

**tstruco** uses a custom serialization system to encode game status into one single string. The system is described [here](SERIALIZATION.md)

tstruco can load saved games via the serialized string. The following snippet shows how to restore a game from previosly a serialized one:

```javascript
import { Truco } from 'tstruco';

const truco = Truco.from('15#2#10O3C11C12E2E6C#N##N#00-00-00#H0C0--P0---#A0B0#T');

```


## Game Api

All the posible methods/actions available in a game of truco are described below and how to use them within the library. Via the action method of the main 'Truco' object, you can interact with the game.

In tstruco player's numbers goes from 0 to 5, depending on the number of players of the current game. A game of Truco supports players in pairs/teams, so the only posible numbers of players are 2, 4 or 6 according to the rules of the game.
As a convenion, in tstruco, even player numbers(eg 0,2,4) are of team A, and odd player(eg 1,3,5) numbers are of team B.

For cards, as Truco utilizes the spanish deck, we encode each card with the rank of the card(a number) and the suit(a letter). In Truco only ranks from 1 to 7 and 10 to 12 from the spanish deck are used.
Rank codes are E for 'Espada', B for 'BASTO', O for 'ORO' and C for 'COPA'. 
For example a card with rank 7 and suit 'ESPADA' is encoded with the string **'7E'**.

```javascript
import { Truco } from 'tstruco';

const truco = new Truco();

truco.action('action type', params);

```

| Action        | Usage                                   | Params                                                                     |
| -----------   | --------------------------------------- | -------------------------------------------------------------------------- |
| newGame       | truco.action('newGame', params)         | { rules: { numberOfPlayers: number, maxPoints: number, flor: boolean } }   |
| newHand       | truco.action('newHand', {})             | -                                                                          |
| playCard      | truco.action('playCard', parms)         | { player: number, cardCode: string }                                       |
| chantEnvido   | truco.action('chantEnvido', params)     | { player: number, chant: number }                                          |
| respondEnvido | truco.action('respondEnvido', params)   | { player: number, accepted: boolean }                                      |
| playEnvido    | truco.action('playEnvido', params)      | { player: number, cardsCode: string[] }                                    |
| chantTruco    | truco.action('chantTruco', params)      | { player: number, trucoLevel: number }                                     |
| respondTruco  | truco.action('respondTruco', params)    | { player: number, accepted: boolean }                                      |
| chantFlor     | truco.action('chantFlor', params)       | { player: number, florLevel: number }                                      |
| respondFlor   | truco.action('respondFlor', params)     | { player: number, accepted: boolean }                                      |
| playFlor      | truco.action('playFlor', params)        | { player: number, cardsCodes: string[] }                                   |
| goToDeck      | truco.action('goToDeck', params)        | { player: number }                                                         |
