import React from "react";

import WithEdit from "../../components/WithEdit";
import { PolicyForm } from "../../store/ContentActions";
import usePermissions from "../../utilities/Permissions";
import PolicyEdit, { IPolicyEditProps } from "./PolicyEdit";
import PolicyView from "./PolicyView";

export interface IPolicyDetailProps extends IPolicyEditProps {
    edit: boolean;
}

const PolicyDetail: React.FC<IPolicyDetailProps> = (props) => {
    const { policy, edit, Cancel, Delete, Save } = props;
    const permissions = usePermissions();

    return (
        <WithEdit
            formName={PolicyForm}
            initEdit={edit}
            canEdit={permissions.canEditPolicies()}
            viewComponent={<PolicyView policy={policy} />}
            editComponent={<PolicyEdit policy={policy} Cancel={Cancel} Delete={Delete} Save={Save} />}
        />
    );
};

export default PolicyDetail;
