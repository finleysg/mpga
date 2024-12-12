import React from "react";

import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";

import LoadingContainer from "../components/LoadingContainer";
import { useGetTournamentQuery } from "../features/tournaments/tournamentApi";
import TournamentPhotoList from "../features/tournaments/TournamentPhotoList";
import { Tournament } from "../models/Events";

const TournamentGalleryPage: React.FC = () => {
  const { name } = useParams();
  const { data: tournament, isLoading } = useGetTournamentQuery(name);

  return (
    <Container fluid={true}>
      <LoadingContainer loading={isLoading}>
        {tournament?.id && <TournamentPhotoList tournament={new Tournament(tournament)} />}
      </LoadingContainer>
    </Container>
  );
};

export default TournamentGalleryPage;
