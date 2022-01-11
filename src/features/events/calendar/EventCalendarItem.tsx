import React from "react";

import styled from "styled-components";

import { EventCalendarProps } from "../eventsPropType";

const CalendarItem = styled.div`
  cursor: pointer;
  margin-bottom: 25px;
  img {
    width: 60px;
    height: 60px;
    background-size: contain;
    object-fit: scale-down;
    float: left;
  }
  p {
    float: none;
    margin: 0px 0px 0px 80px;
  }
`;
CalendarItem.displayName = "CalendarItem";

const EventCalendarItem: React.FC<EventCalendarProps> = (props) => {
  const { eventDetail, onSelect } = props;

  return (
    <CalendarItem onClick={() => onSelect(eventDetail.tournament.systemName)}>
      {eventDetail.location?.logoUrl && <img src={eventDetail.location.logoUrl} alt={eventDetail.location.name} />}
      <p className="text-secondary">
        <strong>{eventDetail.tournament?.name}</strong>
      </p>
      <p>{eventDetail.location.name}</p>
      {eventDetail.eventType === "P" && <p className="text-danger">POSTPONED: new date is TBD</p>}
      {eventDetail.eventType === "C" && <p className="text-danger">CANCELED</p>}
      {eventDetail.eventType !== "P" && eventDetail.eventType !== "C" && <p>{eventDetail.eventDates}</p>}
    </CalendarItem>
  );
};

export default EventCalendarItem;
