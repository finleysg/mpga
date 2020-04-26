import React from "react";
import styled from "styled-components";

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

export interface ICalendarItemProps {
    eventId: number;
    tournamentName: string;
    hostCourseName: string;
    hostCourceImageUrl?: string;
    eventDates: string;
    rounds: number;
    linkName?: string;
    eventType: string;
    OnSelect: (linkName: string) => void;
}

const EventCalendarItem: React.FC<ICalendarItemProps> = (props) => {
    const { linkName, tournamentName, hostCourseName, hostCourceImageUrl, eventDates, eventType } = props;

    return (
        <CalendarItem onClick={() => linkName && props.OnSelect(linkName)}>
            {hostCourceImageUrl && <img src={hostCourceImageUrl} alt={hostCourseName} />}
            <p className="text-secondary">
                <strong>{tournamentName}</strong>
            </p>
            <p>{hostCourseName}</p>
            {eventType === "P" && <p className="text-danger">POSTPONED: new date is TBD</p>}
            {eventType === "C" && <p className="text-danger">CANCELED</p>}
            {eventType !== "P" && eventType !== "C" && <p>{eventDates}</p>}
        </CalendarItem>
    );
};

export default EventCalendarItem;
