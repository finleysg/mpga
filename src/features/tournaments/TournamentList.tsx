import React from "react";

import LoadingContainer from "../../components/LoadingContainer";
import { Tournament } from "../../models/Events";
import { useGetTournamentsQuery } from "./tournamentApi";
import TournamentDetail from "./TournamentDetail";

const TournamentList: React.FC = () => {
  const { tournaments, isLoading } = useGetTournamentsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      tournaments: data?.find((t) => t.system_name !== "match-play"),
      isLoading,
    }),
  });

  return (
    <LoadingContainer loading={isLoading}>
      {tournaments.map((tournament) => (
        <TournamentDetail key={tournament.id} tournament={new Tournament(tournament)} />
      ))}
    </LoadingContainer>
  );
};

export default TournamentList;
