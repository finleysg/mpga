import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

import { MpgaPhoto } from "../../models/Documents";
import usePermissions from "../../utilities/Permissions";
import PhotoEditModal from "./PhotoEditModal";

const Image = styled.div`
    background-color: #fff;
    box-sizing: border-box;
    float: left;
    margin: 4px;
    overflow: hidden;
    position: relative;
    @media (max-width: 480px) {
        width: calc(100% - 4px);
    }
    @media (min-width: 481px) and (max-width: 960px) {
        width: calc(33% - 4px);
    }
    @media (min-width: 961px) and (max-width: 1440px) {
        width: calc(25% - 4px);
    }
    @media (min-width: 1441px) {
        width: calc(12% - 4px);
    }
    &:hover: {
        opacity: 0.9;
    }
    > img {
        cursor: pointer;
        max-width: 100%;
    }
    > p {
        font-size: 80%;
    }
`;
Image.displayName = "Image";

export interface IPhotoView {
    photo: MpgaPhoto;
    Save: (photo: MpgaPhoto) => void;
    OnSelect: () => void;
}

const PhotoThumb: React.FC<IPhotoView> = (props) => {
    const { photo, Save, OnSelect } = props;
    const [editImage, setEditImage] = useState(false);
    const permissions = usePermissions();

    return (
        <Image key={photo.thumbnailUrl}>
            <img onClick={() => OnSelect()} alt={photo.caption} src={photo.thumbnailUrl} />
            <p className="text-muted mb-0">{photo.caption}</p>
            {permissions.canEditPhotos() && (
                <Button variant="link" className="text-warning" onClick={() => setEditImage(true)}>
                    Edit Caption
                </Button>
            )}
            <PhotoEditModal show={editImage} photo={photo} Save={Save} onClose={() => setEditImage(false)} />
        </Image>
    );
};

export default PhotoThumb;
