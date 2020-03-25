import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { MpgaPhoto } from "../../../models/Documents";
import { EventDetail } from "../../../models/Events";

const RandomPhoto = styled.img`
    max-width: 95%;
`;
RandomPhoto.displayName = "RandomPhoto";

interface IEventGalleryViewProps {
    samplePhoto: MpgaPhoto;
    eventDetail: EventDetail;
}

const EventGalleryView: React.FunctionComponent<IEventGalleryViewProps> = props => {
    const { samplePhoto, eventDetail } = props;

    return (
        <React.Fragment>
            <h3 className="text-primary">Tournament Photos</h3>
            <RandomPhoto src={samplePhoto.imageUrl} alt={samplePhoto.caption} />
            <p className="mb-0">
                <strong>{samplePhoto.year}</strong>
            </p>
            <p>{samplePhoto.caption}</p>
            <NavLink
                to={`/tournaments/gallery/${eventDetail.tournament?.systemName}/${eventDetail.mostRecentYear}`}
                className="nav-link"
                activeClassName="active">
                {eventDetail.mostRecentYear} Tournament Gallery
            </NavLink>
        </React.Fragment>
    );
};

export default EventGalleryView;
