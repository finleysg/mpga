import * as React from "react";

import WithEdit from "../../../components/WithEdit";
import { EventPolicyForm } from "../../../store/EventActions";
import usePermissions from "../../../utilities/Permissions";
import EventPolicyEdit, { IEventPolicyEditProps } from "./EventPolicyEdit";
import EventPolicyView from "./EventPolicyView";

export interface IEventPolicyDetailProps extends IEventPolicyEditProps {
    edit: boolean;
}

const EventPolicyDetail: React.FunctionComponent<IEventPolicyDetailProps> = (props) => {
    const { policy, edit, Cancel, Save, Remove } = props;
    const permissions = usePermissions();

    return (
        <WithEdit
            formName={EventPolicyForm}
            initEdit={edit}
            canEdit={permissions.canManageEvent()}
            viewComponent={<EventPolicyView policy={policy} />}
            editComponent={<EventPolicyEdit policy={policy} Cancel={Cancel} Save={Save} Remove={Remove} />}
        />
    );
};

export default EventPolicyDetail;
