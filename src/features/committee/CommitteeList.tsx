import React, { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import LoadingContainer from "../../components/LoadingContainer";
import { ExecutiveCommittee } from "../../models/Clubs";
import { IApplicationState } from "../../store";
import CommitteeActions from "../../store/CommitteeActions";
import MemberClubActions from "../../store/MemberClubActions";
import usePermissions from "../../utilities/Permissions";
import { IContactData } from "../contacts/ContactApi";
import ContactSearch from "../contacts/ContactSearch";
import CommitteeMemberDetail from "./CommitteeMemberDetail";

const CommitteeList: React.FC = () => {
    const [findContact, setFindContact] = useState(false);
    const dispatch = useDispatch();
    const permissions = usePermissions();
    const committeeState = useSelector((state: IApplicationState) => state.committee);
    const memberState = useSelector((state: IApplicationState) => state.memberClubs);
    const canAdd = committeeState.members.findIndex((ec) => ec.id === 0) < 0; // no pending add

    useEffect(() => {
        dispatch(CommitteeActions.LoadCommittee());
        if (!memberState.clubs || memberState.clubs.length === 0) {
            dispatch(MemberClubActions.LoadMemberClubs());
        }
    }, [dispatch, memberState.clubs]);

    const saveCommitteeMember = useCallback(
        (committeeMember: ExecutiveCommittee) => dispatch(CommitteeActions.SaveCommitteeMember(committeeMember)),
        [dispatch]
    );

    const removeCommitteeMember = useCallback(
        (committeeMember: ExecutiveCommittee) => dispatch(CommitteeActions.DeleteCommitteeMember(committeeMember)),
        [dispatch]
    );

    const addCommitteeMember = (contact: IContactData) => {
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
                            clubs={memberState.clubs}
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
