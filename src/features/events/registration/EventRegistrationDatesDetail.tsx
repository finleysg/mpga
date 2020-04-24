import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingContainer from "../../../components/LoadingContainer";
import WithEdit from "../../../components/WithEdit";
import { EventDetail } from "../../../models/Events";
import { IApplicationState } from "../../../store";
import EventActions, { EventForm } from "../../../store/EventActions";
import usePermissions from "../../../utilities/Permissions";
import EventRegistrationDatesEdit from "./EventRegistrationDatesEdit";
import EventRegisrationDatesView from "./EventRegistrationDatesView";

const EventRegistrationDatesDetail: React.FC = () => {
    const state = useSelector((state: IApplicationState) => state.events);
    const dispatch = useDispatch();
    const permissions = usePermissions();

    const saveEventDetail = useCallback((eventDetail: EventDetail) => dispatch(EventActions.SaveEvent(eventDetail)), [
        dispatch,
    ]);

    return (
        <LoadingContainer hasData={state.currentEvent !== undefined}>
            <WithEdit
                formName={EventForm}
                initEdit={false}
                canEdit={permissions.canManageEvent()}
                viewComponent={<EventRegisrationDatesView eventDetail={state.currentEvent} />}
                editComponent={<EventRegistrationDatesEdit eventDetail={state.currentEvent} Save={saveEventDetail} />}
            />
        </LoadingContainer>
    );
};

export default EventRegistrationDatesDetail;
