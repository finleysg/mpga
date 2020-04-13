import React from "react";

import EditableDiv from "../../components/EditableDiv";
import PolicyEdit, { IPolicyEditProps } from "./PolicyEdit";
import PolicyView from "./PolicyView";
import usePermissions from "../../utilities/Permissions";

export interface IPolicyDetailProps extends IPolicyEditProps {
    edit: boolean;
}

const PolicyDetail: React.FC<IPolicyDetailProps> = (props) => {
    const { policy, edit, Cancel, Delete, Save } = props;
    const permissions = usePermissions();

    return (
        <EditableDiv
            initEdit={edit}
            canEdit={permissions.canEditPolicies()}
            viewComponent={<PolicyView policy={policy} />}
            editComponent={<PolicyEdit policy={policy} Cancel={Cancel} Delete={Delete} Save={Save} />}
        />
    );
};

export default PolicyDetail;
