import { Gallery } from "../photos/gallery"
import { TournamentDetailProps } from "./tournamentPropTypes"

const TournamentPhotoList = (props: TournamentDetailProps) => {
	const { tournament } = props

	return (
		<div>
			<h3 className="text-primary">{tournament.name} Gallery</h3>
			<Gallery tournamentId={tournament.id} />
		</div>
	)
}

export default TournamentPhotoList
