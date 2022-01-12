import React from "react";

import LoadingContainer from "../../components/LoadingContainer";
import { Tournament } from "../../models/Events";
import { useGetTournamentsQuery } from "./tournamentApi";
import TournamentDetail from "./TournamentDetail";

const TournamentList: React.FC = () => {
  const { tournaments, isLoading } = useGetTournamentsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      tournaments: data?.filter((t) => t.system_name !== "match-play").map((t) => new Tournament(t)),
      isLoading,
    }),
  });

  return (
    <LoadingContainer loading={isLoading}>
      {tournaments && tournaments.map((tournament) => <TournamentDetail key={tournament.id} tournament={tournament} />)}
    </LoadingContainer>
  );
};

export default TournamentList;
