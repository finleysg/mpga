import React from "react";

import LabelAndValue, { LabelStyle, ValueType } from "../../components/LabelAndValue";
import { ExecutiveCommittee } from "../../models/Clubs";

export interface IExecutiveCommitteeProps {
    committeeMember: ExecutiveCommittee
}

const CommitteeMemberView: React.FC<IExecutiveCommitteeProps> = (props) => {
    const { committeeMember } = props;
    return (
        <div>
            <h4 className="text-secondary">{committeeMember.contact?.firstName + " " + committeeMember.contact?.lastName}</h4>
            <h5 className="text-muted">{committeeMember.role}</h5>
            <LabelAndValue
                label={"Email"}
                value={committeeMember.contact?.email}
                labelStyle={LabelStyle.Inline}
                valueType={ValueType.Text} />
            <LabelAndValue
                label={"Home Club"}
                value={committeeMember.homeClubName}
                labelStyle={LabelStyle.Inline}
                valueType={ValueType.Text} />
        </div>
    );
};

export default CommitteeMemberView;
