import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoadingContainer from "../../../components/LoadingContainer";
import constants from "../../../constants";
import { IApplicationState } from "../../../store";
import EventActions from "../../../store/EventActions";
import EventCalendarItem from "./EventCalendarItem";

const EventCalendar: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: IApplicationState) => state.events);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(EventActions.LoadEvents());
  }, [dispatch]);

  const handleNavigation = (linkName: string) => {
    const location = {
      pathname: `/tournaments/detail/${linkName}/${constants.EventCalendarYear}`,
    };
    navigate(location);
  };

  return (
    <div>
      <h3 className="text-primary mb-3">{constants.EventCalendarYear} Tournament Calendar</h3>
      <LoadingContainer loading={state.events === undefined}>
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
