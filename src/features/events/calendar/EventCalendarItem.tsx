import React from 'react';
import styled from 'styled-components';

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
    eventId: number,
    tournamentName: string,
    hostCourseName: string,
    hostCourceImageUrl?: string,
    eventDates: string,
    rounds: number,
    linkName?: string,
    OnSelect: (linkName: string) => void,
}

const EventCalendarItem: React.FC<ICalendarItemProps> = (props) => {
    const { linkName, tournamentName, hostCourseName, hostCourceImageUrl, eventDates } = props;

    return (
        <CalendarItem onClick={() => linkName && props.OnSelect(linkName)}>
            {hostCourceImageUrl && <img src={hostCourceImageUrl} alt={hostCourseName} />}
            <p className="text-secondary"><strong>{tournamentName}</strong></p>
            <p>{hostCourseName}</p>
            <p>{eventDates}</p>
        </CalendarItem>
    );
}

export default EventCalendarItem;
