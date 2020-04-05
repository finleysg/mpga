import React from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";

import TournamentLoader from "../features/tournaments/TournamentLoader";
import TournamentPhotoList from "../features/tournaments/TournamentPhotoList";

const TournamentGalleryPage: React.FC = () => {
    const { name } = useParams();

    return (
        <Container fluid={true}>
            <TournamentLoader name={name || ""} />
            <TournamentPhotoList />
        </Container>
    );
};

export default TournamentGalleryPage;
