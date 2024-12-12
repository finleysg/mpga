import { ClubContact, MatchResult, Team } from "../../models/Clubs";

export type TeamProps = {
  team: Team;
  addSpace: boolean;
};

export type MatchResultProps = {
  result: MatchResult;
};

export type MatchResultEditProps = MatchResultProps & {
  onClose: () => void;
};

export type TeamCaptainProps = {
  captains: ClubContact[];
};
