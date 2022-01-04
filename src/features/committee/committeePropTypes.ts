import { ExecutiveCommittee } from "../../models/Clubs";

export type ExecutiveCommitteeProps = {
  committeeMember: ExecutiveCommittee;
};

export type ExecutiveCommitteeEditProps = ExecutiveCommitteeProps & {
  onClose: () => void;
};

export type ExecutiveCommitteeDetail = ExecutiveCommitteeEditProps & {
  edit: boolean;
};
