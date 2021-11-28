import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loading from '../../components/Loading';
import { MpgaPhoto } from '../../models/Documents';
import { IApplicationState } from '../../store';
import PhotoActions from '../../store/PhotoActions';
import GalleryMenu from '../gallery/GalleryMenu';
import PhotoGallery from '../gallery/PhotoGallery';

const TournamentPhotoList: React.FC = () => {
    let { year } = useParams<{ year: string }>();
    const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.photos);
    const tournament = useSelector(
        (state: IApplicationState) => state.tournament?.currentTournament
    );

    useEffect(() => {
        if (tournament) {
            dispatch(PhotoActions.LoadTournamentPhotos(year ? +year : undefined));
        }
    }, [dispatch, tournament, year]);

    const toggleLightbox = (index: number) => {
        setLightboxIsOpen(!lightboxIsOpen);
        setSelectedIndex(index);
    };

    const imageList = (photos: MpgaPhoto[]) => {
        return photos.map((p: MpgaPhoto) => {
            return {
                caption: p.caption,
                source: {
                    regular: p.imageUrl!,
                    thumbnail: p.thumbnailUrl,
                    fullscreen: p.rawImage,
                    download: p.rawImage,
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
                    <PhotoGallery photos={state.data} OnSelect={(idx) => toggleLightbox(idx)} />
                    <ModalGateway>
                        {lightboxIsOpen ? (
                            <Modal onClose={() => toggleLightbox(selectedIndex)}>
                                <Carousel
                                    views={imageList(state.data)}
                                    currentIndex={selectedIndex}
                                />
                            </Modal>
                        ) : null}
                    </ModalGateway>
                </React.Fragment>
            )}
        </div>
    );
};

export default TournamentPhotoList;
