import { ExecutiveCommittee } from "../../models/Clubs";
import { IClubData } from "../../models/Data";

export type ExecutiveCommitteeProps = {
  committeeMember: ExecutiveCommittee;
};

export type ExecutiveCommitteeEditProps = ExecutiveCommitteeProps & {
  clubs: IClubData[];
  Cancel: () => void;
  Remove: (member: ExecutiveCommittee) => void;
  Save: (member: ExecutiveCommittee) => void;
};

export type ExecutiveCommitteeDetail = ExecutiveCommitteeEditProps & {
  edit: boolean;
};
