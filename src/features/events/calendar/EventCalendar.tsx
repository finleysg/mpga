import React from "react";

import { EventDetail } from "models/Events";
import { useNavigate } from "react-router-dom";

import LoadingContainer from "../../../components/LoadingContainer";
import constants from "../../../constants";
import { useGetEventsQuery } from "../eventsApi";
import EventCalendarItem from "./EventCalendarItem";

const EventCalendar: React.FC = () => {
  const { data: events, isLoading } = useGetEventsQuery(constants.EventCalendarYear);
  const navigate = useNavigate();

  const handleNavigation = (linkName: string) => {
    const location = {
      pathname: `/tournaments/detail/${linkName}/${constants.EventCalendarYear}`,
    };
    navigate(location);
  };

  return (
    <div>
      <h3 className="text-primary mb-3">{constants.EventCalendarYear} Tournament Calendar</h3>
      <LoadingContainer loading={isLoading}>
        {events
          ?.map((eventData) => new EventDetail(eventData))
          .map((event) => {
            return <EventCalendarItem key={event.id} eventDetail={event} onSelect={handleNavigation} />;
          })}
      </LoadingContainer>
    </div>
  );
};

export default EventCalendar;
