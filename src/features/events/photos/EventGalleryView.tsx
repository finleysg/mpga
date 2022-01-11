import React from "react";

import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { MpgaPhoto } from "../../../models/Documents";
import { EventProps } from "../eventsPropType";

const RandomPhoto = styled.img`
  max-width: 95%;
`;
RandomPhoto.displayName = "RandomPhoto";

type SamplePhotoProps = EventProps & {
  samplePhoto: MpgaPhoto;
};

const EventGalleryView: React.FC<SamplePhotoProps> = (props) => {
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
        className={(isActive) => ("nav-link" + isActive ? "active" : "")}
      >
        {eventDetail.mostRecentYear} Tournament Gallery
      </NavLink>
    </React.Fragment>
  );
};

export default EventGalleryView;
