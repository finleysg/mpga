import { createSelector } from "@reduxjs/toolkit";

import React, { useMemo } from "react";

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

  const selectTournament = useMemo(() => {
    return createSelector(
      (res) => res.data,
      (data) => (data ? new Tournament(data) : undefined),
    );
  }, []);

  const { tournament, isLoading } = useGetTournamentQuery(name, {
    selectFromResult: (result) => ({
      ...result,
      tournament: selectTournament(result),
    }),
  });

  return (
    <Container fluid={true}>
      <LargeLeftSmallRight
        LeftColumn={
          <LoadingContainer loading={isLoading}>
            {tournament && <TournamentHistoryTable tournament={tournament} />}
          </LoadingContainer>
        }
        RightColumn={tournament && <TournamentResultList tournament={tournament} />}
      />
    </Container>
  );
};

export default TournamentHistoryPage;
