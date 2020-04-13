import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import EditableDiv from "../../../components/EditableDiv";
import { EventDetail } from "../../../models/Events";
import EventActions from "../../../store/EventActions";
import usePermissions from "../../../utilities/Permissions";
import EventFormatEdit from "./EventFormatEdit";
import EventFormatView from "./EventFormatView";

interface IEventDetailProps {
    eventDetail: EventDetail;
}

const EventFormatDetail: React.FunctionComponent<IEventDetailProps> = (props) => {
    const { eventDetail } = props;
    const dispatch = useDispatch();
    const permissions = usePermissions();

    const saveFormat = useCallback((eventDetail: EventDetail) => dispatch(EventActions.SaveEvent(eventDetail)), [
        dispatch,
    ]);

    return (
        <EditableDiv
            initEdit={false}
            canEdit={permissions.canManageEvent()}
            viewComponent={<EventFormatView eventDetail={eventDetail} />}
            editComponent={<EventFormatEdit eventDetail={eventDetail} Save={saveFormat} />}
        />
    );
};

export default EventFormatDetail;
