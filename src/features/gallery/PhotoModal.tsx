import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { MpgaPhoto } from '../../models/Documents';
import Badge from 'react-bootstrap/Badge';
import styled from 'styled-components';

const PhotoImg = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
`

export interface IPhotoModalProps {
    show: boolean;
    photo: MpgaPhoto;
    onClose: () => void;
}

const PhotoModal: React.FC<IPhotoModalProps> = (props) => {
    const { photo } = props;

    return (
        <Modal size="xl" show={props.show} onHide={() => props.onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>{photo.caption}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PhotoImg src={photo.imageUrl} />
            </Modal.Body>
            <Modal.Footer>
                {/* {photo?.tags?.map(t => {
                    <Badge>{t.name}</Badge>
                })} */}
            </Modal.Footer>
        </Modal>
    );
}

export default PhotoModal;
