import React from "react";

import WithEdit from "../../components/WithEdit";
import { ExecutiveCommittee } from "../../models/Clubs";
import { CommitteeForm } from "../../store/CommitteeActions";
import usePermissions from "../../utilities/Permissions";
import CommitteeMemberEdit from "./CommitteeMemberEdit";
import CommitteeMemberView from "./CommitteeMemberView";
import { ExecutiveCommitteeDetail } from "./CommitteePropTypes";

const CommitteeMemberDetail: React.FC<ExecutiveCommitteeDetail> = (props) => {
  const { committeeMember, clubs, edit, Cancel, Save, Remove } = props;
  const permissions = usePermissions();

  const saveCommitteeMember = (member: ExecutiveCommittee) => {
    Save(member);
  };

  return (
    <WithEdit
      formName={CommitteeForm}
      initEdit={edit}
      canEdit={permissions.canEditCommittee()}
      viewComponent={<CommitteeMemberView committeeMember={committeeMember} />}
      editComponent={
        <CommitteeMemberEdit
          committeeMember={committeeMember}
          clubs={clubs}
          Cancel={Cancel}
          Save={saveCommitteeMember}
          Remove={Remove}
        />
      }
    />
  );
};

export default CommitteeMemberDetail;
