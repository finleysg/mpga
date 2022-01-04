import React, { useRef } from "react";

import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit";
import usePermissions from "../../utilities/Permissions";
import CommitteeMemberEdit from "./CommitteeMemberEdit";
import CommitteeMemberView from "./CommitteeMemberView";
import { ExecutiveCommitteeDetail } from "./committeePropTypes";

const CommitteeMemberDetail: React.FC<ExecutiveCommitteeDetail> = (props) => {
  const { committeeMember, edit } = props;
  const permissions = usePermissions();
  const closeRef = useRef<CloseHandle>();

  const handleClose = () => {
    closeRef.current?.close();
  };

  return (
    <CloseableEditContainer
      ref={closeRef}
      initEdit={edit}
      canEdit={permissions.canEditCommittee()}
      viewComponent={<CommitteeMemberView committeeMember={committeeMember} />}
      editComponent={<CommitteeMemberEdit committeeMember={committeeMember} onClose={handleClose} />}
    />
  );
};

export default CommitteeMemberDetail;
