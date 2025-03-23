# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased] - yyyy-mm-dd

### Added
* [ ] Players can play a face down card(not showing the card value to the opponent)
* [ ] Resign/Accept the opponent cards during a chant play. Like saying 'son buenas' during envido or flor(maybe by playing w/ empty/no cards)
* [ ] Chant over Chant feature. Eg. chant envido during a truco chant, if envido is still available
* [ ] Error handling system w/ custom exceptions
* [ ] Add a GameDetails interface to display the game status in a JSON object, in a more redeable/friendly way than serialization

### Changed

### Fixed

## [1.0.0] - 2025-03-23

### Added
* Remaining score
* Improved documentation

### Changed
* When flor is chanted, disable envido chant during the hand
* If all players go to deck, end and reset the hand

### Fixed
* Validate the card has been dealt to player when he plays a card
* Only the players who have a flor should play it
* Add envido score, if envido wasnt chanted so far and a hand ends by going to deck
* Deny playing playing envido when first round has ended or envido was already played
* Player at deck cannot play/chant(eg. when more than 2 players)
* Going to deck when there are more than 2 players updates the players turns
* Going to deck in the middle of a chant should decline the flor/envido/truco and add the points.
* Chanting a Flor should add 3 points to the player directly. But if any player from the opponent team has a flor, he should be able to chant contra flor or contra flor al resto.

