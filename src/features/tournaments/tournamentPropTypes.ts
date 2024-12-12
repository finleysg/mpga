import { ITournamentWinnerGroup, Tournament, TournamentWinner } from "../../models/Events";

export type TournamentViewProps = {
  systemName: string
}

export type TournamentDetailProps = {
  tournament: Tournament
  logoUrl?: string
}

export type TournamentEditProps = TournamentDetailProps & {
  onClose: () => void
}

export type TournamentWinnerProps = {
  winner: TournamentWinner
}

export type TournamentWinnerViewProps = TournamentWinnerProps & {
  onEdit: (winner: TournamentWinner) => void
}

export type TournamentWinnerEditProps = TournamentWinnerProps & {
  onClose: () => void
}

export type TournamentWinnerDetailProps = TournamentWinnerEditProps & {
  edit: boolean
}

export type TournamentWinnerGroupProps = {
  group: ITournamentWinnerGroup
  onEdit: (winner: TournamentWinner) => void
}
