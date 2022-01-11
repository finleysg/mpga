import React from "react";

import LoadingContainer from "components/LoadingContainer";
import { useGetTournamentQuery } from "features/tournaments/tournamentApi";
import { Tournament } from "models/Events";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";

import LargeLeftSmallRight from "../components/layouts/LargeLeftSmallRight";
import TournamentHistoryTable from "../features/tournaments/TournamentHistoryTable";
import TournamentResultList from "../features/tournaments/TournamentResultList";

const TournamentHistoryPage: React.FC = () => {
  const { name } = useParams();
  const { data: tournament, isLoading } = useGetTournamentQuery(name);

  return (
    <Container fluid={true}>
      <LargeLeftSmallRight
        LeftColumn={
          <LoadingContainer loading={isLoading}>
            <TournamentHistoryTable tournament={new Tournament(tournament)} />
          </LoadingContainer>
        }
        RightColumn={<TournamentResultList tournament={new Tournament(tournament)} />}
      />
    </Container>
  );
};

export default TournamentHistoryPage;
