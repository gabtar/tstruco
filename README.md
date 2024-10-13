# tstruco

# TODO:

# Game
[x] - Game object with public api for play during the game.
[ ] - Serialize object - JSON? or a string code, eg 0123Player1E2BCards...


# Commands:
[x] - Play card command
    [ ] - TODO: play a card that ends the round/hand/game
[x] - New Game command
[x] - New Hand command
[x] - Chant Envido command
[x] - Respond Envido command - Accept/Decline
[ ] - Play Envido command
[ ] - Chant Truco command
[ ] - Respond Truco command
[ ] - Chant Flor command
[ ] - Raise Flor command
[ ] - Response to Flor command
[ ] - Play Flor command
[ ] - Go To Deck command


## Game Api Usage

```
import { Truco } from './models/truco';

const truco = new Truco();

```

| Action        | Usage                                   | Params           |
| -----------   | --------------------------------------- | ---------------- |
| newGame       | truco.action('newGame', params)         | {rules: }        |
| newHand       | truco.action('newHand', {})             |                  |
| playCard      | truco.action('playCard', parms)         |                  |
| chantEnvido   | truco.action('chantEnvido', params)     |                  |
| respondEnvido | truco.action('chantEnvido', params)     |                  |
