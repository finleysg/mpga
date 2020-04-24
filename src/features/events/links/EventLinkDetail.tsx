import * as React from "react";

import WithEdit from "../../../components/WithEdit";
import { EventLinkForm } from "../../../store/EventActions";
import usePermissions from "../../../utilities/Permissions";
import EventLinkEdit, { IEventLinkEditProps } from "./EventLinkEdit";
import EventLinkView, { ILinkRenderProps } from "./EventLinkView";

export interface IEventLinkDetailProps extends IEventLinkEditProps {
    edit: boolean;
    render: ILinkRenderProps;
}

const EventLinkDetail: React.FunctionComponent<IEventLinkDetailProps> = (props) => {
    const permissions = usePermissions();
    const { eventLink, edit, render, Cancel, Save, Delete } = props;

    return (
        <WithEdit
            formName={EventLinkForm}
            initEdit={edit}
            canEdit={permissions.canManageEvent()}
            viewComponent={<EventLinkView eventLink={eventLink} render={render} />}
            editComponent={<EventLinkEdit eventLink={eventLink} Cancel={Cancel} Save={Save} Delete={Delete} />}
        />
    );
};

export default EventLinkDetail;
