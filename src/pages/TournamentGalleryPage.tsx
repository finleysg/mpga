import React from 'react';
import Container from 'react-bootstrap/Container';

import TournamentLoader from '../features/tournaments/TournamentLoader';
import TournamentPhotoList from '../features/tournaments/TournamentPhotoList';

const TournamentGalleryPage: React.FC = () => {
    return (
        <Container fluid={true}>
            <TournamentLoader />
            <TournamentPhotoList />
        </Container>
    );
}

export default TournamentGalleryPage
