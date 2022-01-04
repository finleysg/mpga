import { Award, AwardWinner } from "../../models/Events";

export type AwardViewProps = {
  award: Award;
};

export type AwardDetailProps = {
  awardId: number;
};

export type AwardEditProps = AwardViewProps & {
  onClose: () => void;
};

export type AwardWinnerViewProps = {
  winner: AwardWinner;
};

export type AwardWinnerEditProps = AwardWinnerViewProps & {
  onClose: () => void;
};

export type AwardWinnerDetailProps = AwardWinnerEditProps & {
  award: Award;
  edit: boolean;
};
