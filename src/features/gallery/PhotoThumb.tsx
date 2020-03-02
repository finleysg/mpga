import React, { useState } from "react";
import { MpgaPhoto } from "../../models/Documents";
import Card from "react-bootstrap/Card";
import PhotoModal from "./PhotoModal";

export interface IPhotoView {
    photo: MpgaPhoto;
}

const PhotoThumb: React.FC<IPhotoView> = props => {
    const photo = props.photo;
    const [showImage, setShowImage] = useState(false);

    return (
        <>
            <Card className="text-white mb-2" style={{ width: '12rem' }} onClick={() => setShowImage(true)}>
                <Card.Img src={photo.thumbnailUrl} alt={photo.caption} className="clickable" />
                <Card.ImgOverlay>
                    <Card.Title>{photo.year}</Card.Title>
                </Card.ImgOverlay>
            </Card>
            <PhotoModal show={showImage} photo={photo} onClose={() => setShowImage(false)} />
        </>
    );
};

export default PhotoThumb;
