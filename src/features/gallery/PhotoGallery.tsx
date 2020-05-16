import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { MpgaPhoto } from "../../models/Documents";
import PhotoActions from "../../store/PhotoActions";
import PhotoThumb from "./PhotoThumb";

const Gallery = styled.div`
    overflow: hidden;
    margin-left: -2px;
    margin-right: -2px;
`;
Gallery.displayName = "Gallery";

export interface IPhotoGalleryProps {
    photos: MpgaPhoto[];
    OnSelect: (index: number) => void;
}

const PhotoGallery: React.FC<IPhotoGalleryProps> = (props) => {
    const { photos } = props;
    const dispatch = useDispatch();

    const savePhoto = useCallback((photo: MpgaPhoto) => dispatch(PhotoActions.UpdatePhoto(photo)), [dispatch]);

    const renderGallery = (): JSX.Element => {
        if (photos.length === 0) {
            return (
                <p>
                    We dont have any pictures for this season. Have a tournament photo to share? Send them to
                    info@mpga.net
                </p>
            );
        } else {
            return (
                <Gallery>
                    {photos.map((photo, i) => (
                        <PhotoThumb
                            key={i}
                            photo={photo}
                            Save={savePhoto}
                            OnSelect={() => props.OnSelect(i)}
                        />
                    ))}
                </Gallery>
            );
        }
    };

    return renderGallery();
};

export default PhotoGallery;
