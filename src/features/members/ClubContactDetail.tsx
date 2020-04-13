import React from "react";

import EditableDiv from "../../components/EditableDiv";
import usePermissions from "../../utilities/Permissions";
import ClubContactEdit, { IClubContactEditProps } from "./ClubContactEdit";
import ClubContactView from "./ClubContactView";

export interface IClubContactDetail extends IClubContactEditProps {
    edit: boolean;
}

const ClubContactDetail: React.FC<IClubContactDetail> = (props) => {
    const { clubContact, edit, Cancel, Save, Delete } = props;
    const permissions = usePermissions();

    return (
        <EditableDiv
            initEdit={edit}
            canEdit={permissions.canEditClubPage()}
            viewComponent={<ClubContactView clubContact={clubContact} />}
            editComponent={
                <ClubContactEdit clubContact={clubContact} Cancel={Cancel} Save={Save} Delete={Delete} />
            }></EditableDiv>
    );
};

export default ClubContactDetail;
