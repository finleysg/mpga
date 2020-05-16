import React, { useCallback, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Carousel, { Modal, ModalGateway, ViewType } from "react-images";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loading from "../../components/Loading";
import { MpgaPhoto } from "../../models/Documents";
import { IApplicationState } from "../../store";
import PhotoActions from "../../store/PhotoActions";
import GalleryMenu from "../gallery/GalleryMenu";
import PhotoThumb from "../gallery/PhotoThumb";
import styled from "styled-components";

const Gallery = styled.div`
    overflow: hidden;
    margin-left: -2px;
    margin-right: -2px;
`;
Gallery.displayName = "Gallery";

const Image = styled.div`
    background-color: #eee;
    box-sizing: border-box;
    float: left;
    margin: 2px;
    overflow: hidden;
    padding-bottom: 16%;
    position: relative;
    width: calc(10% - 4px);
    &:hover: {
        opacity: 0.9;
    }
    > img {
        cursor: pointer;
        position: absolute;
        max-width: 100%;
    }
`;
Image.displayName = "Image";

const TournamentPhotoList: React.FC = () => {
    let { year } = useParams();
    const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.photos);
    const tournament = useSelector((state: IApplicationState) => state.tournament?.currentTournament);

    const savePhoto = useCallback((photo: MpgaPhoto) => dispatch(PhotoActions.UpdatePhoto(photo)), [dispatch]);

    useEffect(() => {
        if (tournament) {
            dispatch(PhotoActions.LoadTournamentPhotos(year ? +year : undefined));
        }
    }, [dispatch, tournament, year]);

    const toggleLightbox = (index: number) => {
        setLightboxIsOpen(!lightboxIsOpen);
        setSelectedIndex(index);
    };

    const layoutThumbs = (photos: any[]): JSX.Element => {
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
                    {photos.map((photo, j) => (
                        <Image onClick={() => toggleLightbox(j)} key={photo.source.thumbnail}>
                            <img alt={photo.caption} src={photo.source.thumbnail} />
                        </Image>
                    ))}
                </Gallery>
            );
        }
    };

    const imageList = (photos: MpgaPhoto[]) => {
        return photos.map((p: MpgaPhoto) => {
            return {
                caption: p.caption,
                source: {
                    regular: p.imageUrl!,
                    thumbnail: p.thumbnailUrl,
                    // fullscreen: p.rawImage,
                },
            };
        });
    };

    return (
        <div>
            <h3 className="text-primary">
                {year} {tournament.name} Gallery
            </h3>
            <Row>
                <Col>
                    <GalleryMenu currentYear={year!} />
                </Col>
            </Row>
            {state.isBusy || !state.data ? (
                <Loading />
            ) : (
                <React.Fragment>
                    {layoutThumbs(imageList(state.data))}
                    <ModalGateway>
                        {lightboxIsOpen ? (
                            <Modal onClose={() => toggleLightbox(selectedIndex)}>
                                <Carousel views={imageList(state.data)} currentIndex={selectedIndex} />
                            </Modal>
                        ) : null}
                    </ModalGateway>                    
                </React.Fragment>

            )}
        </div>
    );
};

export default TournamentPhotoList;
