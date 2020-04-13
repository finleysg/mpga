import * as React from "react";

import EditableDiv from "../../../components/EditableDiv";
import usePermissions from "../../../utilities/Permissions";
import EventPointsEdit, { IEventPointsEditProps } from "./EventPointsEdit";
import EventPointsView from "./EventPointsView";

export interface IEventPointsDetailProps extends IEventPointsEditProps {
    edit: boolean;
}

const EventPointsDetail: React.FunctionComponent<IEventPointsDetailProps> = (props) => {
    const permissions = usePermissions();
    const { points, edit, Cancel, Save, Delete } = props;

    return (
        <EditableDiv
            initEdit={edit}
            canEdit={permissions.canManageEvent()}
            viewComponent={<EventPointsView points={points} />}
            editComponent={<EventPointsEdit points={points} Cancel={Cancel} Save={Save} Delete={Delete} />}
        />
    );
};

export default EventPointsDetail;
