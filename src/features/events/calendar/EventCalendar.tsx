import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import constants from "../../../constants";
import { IApplicationState } from "../../../store";
import EventCalendarItem from "./EventCalendarItem";
import EventActions from "../../../store/EventActions";
import LoadingContainer from "../../../components/LoadingContainer";

const EventCalendar: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.events);

    let history = useHistory();

    useEffect(() => {
        dispatch(EventActions.LoadEvents());
    }, [dispatch]);

    const handleNavigation = (linkName: string) => {
        const location = {
            pathname: `/tournaments/detail/${linkName}/${constants.EventCalendarYear}`,
        };
        history.push(location);
    };

    return (
        <div>
            <h3 className="text-primary mb-3">{constants.EventCalendarYear} Tournament Calendar</h3>
            <LoadingContainer hasData={state.events !== undefined}>
                {state.events.map((event) => {
                    return (
                        <EventCalendarItem
                            key={event.id!}
                            eventId={event.id!}
                            tournamentName={event.name}
                            hostCourseName={event.location!.name}
                            hostCourceImageUrl={event.location?.logoUrl}
                            eventDates={event.eventDates}
                            rounds={event.rounds}
                            linkName={event.tournament?.systemName}
                            eventType={event.eventType}
                            OnSelect={handleNavigation}
                        />
                    );
                })}
            </LoadingContainer>
        </div>
    );
};

export default EventCalendar;
