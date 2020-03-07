import moment from 'moment';
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
    startDate: Date,
    rounds: number,
    linkName?: string,
    OnSelect: (linkName: string) => void,
}

const EventCalendarItem: React.FC<ICalendarItemProps> = (props) => {
    const { linkName, tournamentName, hostCourseName, hostCourceImageUrl, startDate, rounds } = props;
    const tournamentDates = rounds > 1 ?
        `${moment(startDate).format("dddd, MMM D")} - ${moment(startDate).add("d", rounds-1).format("dddd, MMM D")}` :
        moment(startDate).format("dddd, MMM D");
    return (
        <CalendarItem onClick={() => linkName && props.OnSelect(linkName)}>
            {hostCourceImageUrl && <img src={hostCourceImageUrl} alt={hostCourseName} />}
            <p className="text-secondary"><strong>{tournamentName}</strong></p>
            <p>{hostCourseName}</p>
            <p>{tournamentDates}</p>
        </CalendarItem>
    );
}

export default EventCalendarItem;
