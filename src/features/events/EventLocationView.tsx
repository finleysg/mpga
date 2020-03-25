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
            <h4 className="text-primary">{eventDetail.location?.name}</h4>
            <h5>{eventDetail.eventDates}</h5>
        </div>
    );
};

export default EventLocationView;
