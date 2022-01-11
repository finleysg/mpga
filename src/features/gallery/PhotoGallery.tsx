import React from "react";

import styled from "styled-components";

import { GalleryProps } from "./galleryPropTypes";
import PhotoThumb from "./PhotoThumb";

const Gallery = styled.div`
  overflow: hidden;
  margin-left: -2px;
  margin-right: -2px;
`;
Gallery.displayName = "Gallery";

const PhotoGallery: React.FC<GalleryProps> = (props) => {
  const { photos, onSelect } = props;

  const renderGallery = (): JSX.Element => {
    if (photos?.length === 0) {
      return (
        <p>We dont have any pictures for this season. Have a tournament photo to share? Send them to admin@mpga.net</p>
      );
    } else {
      return (
        <Gallery>
          {photos?.map((photo, i) => (
            <PhotoThumb key={i} photo={photo} onSelect={() => onSelect(i)} />
          ))}
        </Gallery>
      );
    }
  };

  return renderGallery();
};

export default PhotoGallery;
