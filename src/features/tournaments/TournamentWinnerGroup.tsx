import React from "react";

import { ITournamentWinnerGroup, TournamentWinner } from "../../models/Events";
import TournamentWinnerRow from "./TournamentWinnerRow";

type TournamentWinnerGroupProps = {
  group: ITournamentWinnerGroup;
};

const TournamentWinnerGroup: React.FC<TournamentWinnerGroupProps> = (props) => {
  const { group } = props;

  return (
    <React.Fragment>
      {group.winners.map((winner: TournamentWinner) => {
        return <TournamentWinnerRow key={winner.id} winner={winner} />;
      })}
    </React.Fragment>
  );
};

export default TournamentWinnerGroup;
