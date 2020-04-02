import React, { useState } from "react";
import { useSelector } from "react-redux";

import EditContainer from "../../components/EditContainer";
import { ExecutiveCommittee } from "../../models/Clubs";
import { IApplicationState } from "../../store";
import CommitteeMemberEdit, { IExecutiveCommitteeEditProps } from "./CommitteeMemberEdit";
import CommitteeMemberView from "./CommitteeMemberView";

export interface IExecutiveCommitteeDetail extends IExecutiveCommitteeEditProps {
    edit: boolean;
}

const CommitteeMemberDetail: React.FC<IExecutiveCommitteeDetail> = props => {
    const { committeeMember, clubs, edit, Cancel, Save, Remove } = props;
    const [doEdit, setDoEdit] = useState(edit);
    const session = useSelector((state: IApplicationState) => state.session);

    const saveCommitteeMember = (member: ExecutiveCommittee) => {
        setDoEdit(false);
        Save(member);
    };

    return (
        <EditContainer
            doEdit={doEdit}
            canEdit={session.user.isFullEditor}
            ToggleEdit={() => setDoEdit(!doEdit)}
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
