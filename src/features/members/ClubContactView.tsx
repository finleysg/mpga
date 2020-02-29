import React from "react";
import { FaEnvelope, FaStar } from "react-icons/fa";

import LabelAndValue, { LabelStyle, ValueType } from "../../components/LabelAndValue";
import { ClubContact } from "../../models/Clubs";

export interface IClubContactProps {
    clubContact: ClubContact
}

const ClubContactView: React.FC<IClubContactProps> = (props) => {
    const { clubContact } = props;
    return (
        <div>
            <h5>{clubContact.contact?.firstName + " " + clubContact.contact?.lastName}</h5>
            <LabelAndValue
                label={"Roles"}
                value={clubContact.roles.map(r => r.role).join(", ")}
                defaultValue="No roles defined"
                labelStyle={LabelStyle.Inline}
                valueType={ValueType.Text} />
            <LabelAndValue
                label={"Primary phone"}
                value={clubContact.contact?.primaryPhone}
                defaultValue={"no phone"}
                labelStyle={LabelStyle.Inline}
                valueType={ValueType.Text} />
            <LabelAndValue
                label={"Email"}
                value={clubContact.contact?.email}
                defaultValue={"no email"}
                labelStyle={LabelStyle.Inline}
                valueType={ValueType.Text} />
            {clubContact.isPrimary &&
                <p><FaStar size={18} color={"purple"} /> Primary contact (email)</p>
            }
            {clubContact.useForMailings &&
                <p><FaEnvelope size={18} color={"purple"} /> Primary contact (mailings)</p>
            }
        </div>
    );
};

export default ClubContactView;