import { Award, AwardWinner } from "../../models/Events";

export type AwardViewProps = {
  award: Award;
};

export type AwardDetailProps = {
  awardId: number;
};

export type AwardEditProps = AwardViewProps & {
  Save: (award: Award) => void;
};

export type AwardWinnerViewProps = {
  winner: AwardWinner;
};

export type AwardWinnerDetailProps = AwardWinnerViewProps & {
  award: Award;
  edit: boolean;
  onClose: () => void;
};

export type AwardWinnerEditProps = AwardWinnerViewProps & {
  Save: (winner: AwardWinner) => void;
  Cancel: () => void;
};
