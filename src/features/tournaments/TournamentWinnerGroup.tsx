import React from "react";

import { TournamentWinner } from "../../models/Events";
import { TournamentWinnerGroupProps } from "./tournamentPropTypes";
import TournamentWinnerRow from "./TournamentWinnerRow";

const TournamentWinnerGroup: React.FC<TournamentWinnerGroupProps> = (props) => {
  const { group, onEdit } = props;

  return (
    <React.Fragment>
      {group.winners.map((winner: TournamentWinner) => {
        return <TournamentWinnerRow key={winner.id} winner={winner} onEdit={onEdit} />;
      })}
    </React.Fragment>
  );
};

export default TournamentWinnerGroup;
