import React from "react";

import Container from "react-bootstrap/Container";

import OneCenteredColumn from "../components/layouts/OneCenteredColumn";
import LoadingContainer from "../components/LoadingContainer";
import { useGetTournamentQuery } from "../features/tournaments/tournamentApi";
import TournamentHistoryTable from "../features/tournaments/TournamentHistoryTable";
import { Tournament } from "../models/Events";

const MatchPlayHistoryPage: React.FC = () => {
  const { data: tournament, isLoading } = useGetTournamentQuery("match-play");

  return (
    <Container fluid={true}>
      <OneCenteredColumn>
        <LoadingContainer loading={isLoading}>
          <TournamentHistoryTable tournament={new Tournament(tournament)} />
        </LoadingContainer>
      </OneCenteredColumn>
    </Container>
  );
};

export default MatchPlayHistoryPage;
