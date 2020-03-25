import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditableDiv from "../../../components/EditableDiv";
import Loading from "../../../components/Loading";
import { EventDetail } from "../../../models/Events";
import { IApplicationState } from "../../../store";
import EventActions from "../../../store/EventActions";
import EventRegistrationDatesEdit from "./EventRegistrationDatesEdit";
import EventRegisrationDatesView from "./EventRegistrationDatesView";

const EventRegistrationDatesDetail: React.FC = () => {
    const state = useSelector((state: IApplicationState) => state.events);
    const session = useSelector((state: IApplicationState) => state.session);
    const dispatch = useDispatch();

    const saveEventDetail = useCallback((eventDetail: EventDetail) => dispatch(EventActions.SaveEvent(eventDetail)), [
        dispatch,
    ]);

    return (
        <>
            {state.isBusy ? (
                <Loading />
            ) : (
                <EditableDiv
                    initEdit={false}
                    canEdit={session.user.isFullEditor}
                    viewComponent={<EventRegisrationDatesView eventDetail={state.currentEvent} />}
                    editComponent={
                        <EventRegistrationDatesEdit eventDetail={state.currentEvent} Save={saveEventDetail} />
                    }
                />
            )}
        </>
    );
};

export default EventRegistrationDatesDetail;
