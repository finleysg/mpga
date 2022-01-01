import React, { useCallback, useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import LoadingContainer from "../../components/LoadingContainer";
import { Contact, ExecutiveCommittee } from "../../models/Clubs";
import { useGetClubsQuery } from "../../services/ClubEndpoints";
import { IApplicationState } from "../../store";
import CommitteeActions from "../../store/CommitteeActions";
import usePermissions from "../../utilities/Permissions";
import ContactSearch from "../contacts/ContactSearch";
import CommitteeMemberDetail from "./CommitteeMemberDetail";

const CommitteeList: React.FC = () => {
  const [findContact, setFindContact] = useState(false);
  const dispatch = useDispatch();
  const permissions = usePermissions();
  const committeeState = useSelector((state: IApplicationState) => state.committee);
  const { data: clubs } = useGetClubsQuery();
  const canAdd = committeeState.members.findIndex((ec) => ec.id === 0) < 0; // no pending add

  useEffect(() => {
    dispatch(CommitteeActions.LoadCommittee());
  }, [dispatch]);

  const saveCommitteeMember = useCallback(
    (committeeMember: ExecutiveCommittee) => dispatch(CommitteeActions.SaveCommitteeMember(committeeMember)),
    [dispatch],
  );

  const removeCommitteeMember = useCallback(
    (committeeMember: ExecutiveCommittee) => dispatch(CommitteeActions.DeleteCommitteeMember(committeeMember)),
    [dispatch],
  );

  const addCommitteeMember = (contact: Contact) => {
    if (contact) {
      dispatch(CommitteeActions.AddNewMember(contact));
    } else {
      dispatch(CommitteeActions.AppendNewMember());
    }
    setFindContact(false);
  };

  return (
    <div>
      <div>
        <h3 className="text-primary">Executive Committee Members</h3>
        {permissions.canAddCommittee() && canAdd && (
          <Button variant="link" className="text-warning" onClick={() => setFindContact(true)}>
            Add New
          </Button>
        )}
      </div>
      {findContact && <ContactSearch allowNew={true} OnSelect={addCommitteeMember} />}
      <LoadingContainer hasData={committeeState.members && committeeState.members.length > 0}>
        {committeeState.members.map((ec: ExecutiveCommittee) => {
          return (
            <CommitteeMemberDetail
              key={ec.id}
              committeeMember={ec}
              clubs={clubs}
              edit={ec.id === 0}
              Cancel={() => dispatch(CommitteeActions.CancelNewMember())}
              Remove={removeCommitteeMember}
              Save={saveCommitteeMember}
            />
          );
        })}
      </LoadingContainer>
    </div>
  );
};

export default CommitteeList;
