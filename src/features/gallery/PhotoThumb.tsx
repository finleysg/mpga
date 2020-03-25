import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";

import { MpgaPhoto } from "../../models/Documents";
import { IApplicationState } from "../../store";
import PhotoEditModal from "./PhotoEditModal";
import PhotoModal from "./PhotoModal";

export interface IPhotoView {
    photo: MpgaPhoto;
    Save: (photo: MpgaPhoto) => void;
}

const PhotoThumb: React.FC<IPhotoView> = props => {
    const { photo, Save } = props;
    const [showImage, setShowImage] = useState(false);
    const [editImage, setEditImage] = useState(false);
    const session = useSelector((state: IApplicationState) => state.session);

    return (
        <>
            <Card className="text-white mb-2" style={{ width: "12rem" }}>
                <Card.Img
                    src={photo.thumbnailUrl}
                    alt={photo.caption}
                    className="clickable"
                    onClick={() => setShowImage(true)}
                />
                <Card.Footer className="text-primary">
                    {photo.caption}
                    {session.user.isFullEditor && (
                        <Button variant="link" className="text-warning" onClick={() => setEditImage(true)}>
                            Edit
                        </Button>
                    )}
                </Card.Footer>
            </Card>
            <PhotoModal show={showImage} photo={photo} onClose={() => setShowImage(false)} />
            <PhotoEditModal show={editImage} photo={photo} Save={Save} onClose={() => setEditImage(false)} />
        </>
    );
};

export default PhotoThumb;