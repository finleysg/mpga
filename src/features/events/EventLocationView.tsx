import * as React from "react";
import { EventDetail } from "../../models/Events";
import styled from "styled-components";

const CourseLogo = styled.img`
    width: 80px;
    height: 80px;
    background-size: contain;
    object-fit: scale-down;
    float: right;
`;
CourseLogo.displayName = "CourseLogo";

interface IEventDetailProps {
    eventDetail: EventDetail;
}

const EventLocationView: React.FunctionComponent<IEventDetailProps> = (props) => {
    const { eventDetail } = props;
    return (
        <div>
            <a target="_blank" rel="noopener noreferrer" href={eventDetail.location?.website}>
                <CourseLogo src={eventDetail.location?.logoUrl} />
            </a>
            <h4 className="text-secondary">{eventDetail.location?.name}</h4>
            {eventDetail.eventType === "P" && <h5 className="text-danger">POSTPONED</h5>}
            {eventDetail.eventType === "C" && <h5 className="text-danger">CANCELED</h5>}
            {eventDetail.eventType !== "P" && eventDetail.eventType !== "C" && <h5>{eventDetail.eventDates}</h5>}
        </div>
    );
};

export default EventLocationView;
