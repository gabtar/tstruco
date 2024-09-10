import { Card } from "../models/card";
import { Hand } from "../models/hand";
import { Player } from "../models/player";

export class PlayCardCommand {

	public execute(hand: Hand, player: Player, card: Card): void {

		// TODO: validations...
		// Check not in Envido/Flor phase
		// check player turn

		const currentRound = hand.rounds[hand.currentRound];
		currentRound.playCard(player, card);

	}
}
