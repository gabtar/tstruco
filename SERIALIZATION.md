
### Introduction

The idea is to serialize a Game of Argentinian Truco into an encoded string. The string should have all necessary data of an state the game, so we can reconstruct the game with their current values/status/turns/etc from that string. The idea is to have a final structure similar to a FEN notation string for a game of chess.

### Serialization in strings of each parts of a Truco game

#### Rules
The rules of the game of truco. If its played with 'flor' and the total score of the game. The score could be up to 15 or 30 points. So the string will be represented with an F if played with flor, or none and will end in 15 or 30, eg **"F30"** or **"15"**

#### Players
It will be represented by the numbers of players in the game. In a Truco game the only possibilities are 2, 4, or 6 players.

#### Cards dealt
Here we will encode the cards dealt to the players. The cards will be represented with their card code. For this, as each card is unique, because it has a rank and a suit, and each combination of them constitutes a card, the string code will be conformed with the rank and the suit. Eg. **"1E"** means the rank is 1, and the suit is spades (of the Spanish deck).

As for each player 3 cards are dealt, we will have a multiple of 3 depending on the number of players.
An example of the cards dealt in a hand, for example if we have a 2 player game, and player 1 has "7 Basto", "1 Basto" and "3 Oro" cards, and player 2 has "5 Espada", "3 Oro" and "4 Copa" cards the encoded string of cards dealt will be **"7B1B3O5E3O4C"**.

#### Envido
We will encode the chants so far, with the following letters:

| Letter |    Chant     |
| :----: | :----------: |
| **E**  |    Envido    |
| **R**  | Real Envido  |
| **F**  | Falta Envido |

The string could be composed of different levels of envido chanted so far, so for example if in a game we chant "Envido" and the opponent responses with another chant, like "Real Envido" the string code will be **"ER"**.
A final letter will be indicated if the envido was accepted **A** or declined **D**. And when no letter is at the end will mean that the envido is still open or awaiting a response of a player.

If cards were played during the envido, we will encode them with the number of the player(from 0 to 5, in case of 6 players) followed with the codes of the cards played. So we will have, if it was chanted Envido an accepted by the opponent. Player 0 played "3 de Espada" and "7 de espada", and player 1 played  "2 de Basto" and "5 de Basto", we will have the following code(a dash will separate each envido play by a player):

At the end of the cards played by player, we will have a number indicating the winner of the envido play. If no winner yet, we will indicate with an 'N'.

```
EA-03E7E-12B5B-0
```

#### Flor
As in envido we will encode the level(s) chanted and the status if it was accepted or declined. In **flor** we have the following levels:

| Letter |        Chant         |
| :----: | :------------------: |
| **F**  |         Flor         |
| **C**  |     Contra Flor      |
| **R**  | Contra Flor al Resto |

So, an example of this encode will be **"FCD"** for a *flor* chant, responded with a *contra flor*, and then *declined* by the original player who chanted.

Similarly as with envido, if cards were played during the flor, we will encode them with the player number following the cards code played.

#### Truco
As in the other 2 previous cases we will encode the level chanted so far with letters. So we will have:

| Letter |    Chant    |
| :----: | :---------: |
| **N**  | Not Chanted |
| **T**  |    Truco    |
| **R**  |   Retruco   |
| **V**  |   Vale 4    |

#### Cards played
The cards played during the game. As with the cards dealt, we will use a similar approach. As each player an only play a card during a round, the max number of cards per round will be the same as the total players in the game. The first card will correspond to the first player and so on. If a player has not played a card during a round, it will be represented with a zero. For separating rounds we will use a dash.
For example in a 4 player game we will have the following code knowing that the hand player is player 3, he has played a "3 de Espada", the player 4 has played a "5 de Oro" at the first round.

```
003E50-0000-0000
```

(1st round cards - 2nd round cards - 3rd round cards) / **"0"** means no card played yet

#### Turns
Here we need to encode all information regarding to the status of the turns in the hand. We will use the following codes for the turns section. When the turn is not defined yet, we will use a dash instead of the letter.

| Order | Letter |         Turn         |
| :---: | :----: | :------------------: |
|   1   | **H**  |     Hand Player      |
|   2   | **C**  |     Chant Envido     |
|   3   | **T**  | Response Truco Chant |
|   4   | **F**  | Response Flor Chant  |
|   5   | **P**  |  Play card turn(*)   |
|   6   | **Y**  |  First envido chant  |
|   7   | **Z**  |   First flor chant   |
|   8   | **D**  |   Players at deck    |

(\*) Not necessary as we can reconstruct from the cards played section, but for simplification purposes we will use as it here.

Following each letter code for the turn, we will add the number of the player who has the turn(from 0 to 5 on a 6 player game). In the case of players at deck more than one number can follow the letter.

So, for example, if in a hand we have the following string:

```
H2C2--P2---
```

This means that Player 3 (on a 4 player game) is the hand player, he has the turn to chant envido and the turn to play a card. The rest of the turns of the table are not defined yet.

#### Score

The score section will be encoded with the letter corresponding the team, following their current score in points. So for example if **Team A** has 14 points and **Team B** has 17 points we will have the following string

```
A14B17
```

#### Game Phase

The last section of the encoded string will be the current phase of the game, will the following letter code depending on the game phase.

| Letter |  Game Phase  |
| :----: | :----------: |
| **T**  |    Truco     |
| **CT** | Chant Truco  |
| **CE** | Chant Envido |
| **PE** | Play envido  |
| **CF** |  Chant Flor  |
| **PF** |  Play Flor   |

So that we can only have 1 game phase at a time, we simple refer to it whit these codes.

### Full game state serialization example

We will encode the previos sections defined and join them by using an special character as a separator. In this case we will use the numeral character or "#".
So we will have the following structure for the encoded string of the game:

{ RULES} # { PLAYERS } # { CARDS DEALT } # { ENVIDO } # { FLOR } # { TRUCO } # { CARDS PLAYED } # { TURNS } ll# { SCORE } # { GAME PHASE }
