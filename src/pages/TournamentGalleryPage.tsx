import React from "react";

import LoadingContainer from "components/LoadingContainer";
import { useGetTournamentQuery } from "features/tournaments/tournamentApi";
import { Tournament } from "models/Events";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";

import TournamentPhotoList from "../features/tournaments/TournamentPhotoList";

const TournamentGalleryPage: React.FC = () => {
  const { name } = useParams();
  const { data: tournament, isLoading } = useGetTournamentQuery(name);

  return (
    <Container fluid={true}>
      <LoadingContainer loading={isLoading}>
        <TournamentPhotoList tournament={new Tournament(tournament)} />
      </LoadingContainer>
    </Container>
  );
};

export default TournamentGalleryPage;
