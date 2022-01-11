import { Tournament, TournamentWinner } from "models/Events";

export type TournamentViewProps = {
  systemName: string;
};

export type TournamentDetailProps = {
  tournament: Tournament;
};

export type TournamentEditProps = TournamentDetailProps & {
  onClose: () => void;
};

export type TournamentWinnerProps = {
  winner: TournamentWinner;
};

export type TournamentWinnerEditProps = TournamentWinnerProps & {
  onClose: () => void;
};

export type TournamentWinnerDetailProps = TournamentWinnerEditProps & {
  edit: boolean;
};
