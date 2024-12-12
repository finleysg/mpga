import React from "react";

import { TournamentWinnerProps } from "../../../features/tournaments/tournamentPropTypes";
import { TournamentWinner } from "../../../models/Events";

const EventWinnerView: React.FC<TournamentWinnerProps> = (props) => {
  const renderWinner = (winner: TournamentWinner): any => {
    return (
      <p className="mb-0">
        {winner.winner} ({winner.winnerClub})
        {winner.coWinner && (
          <span>
            {" "}
            / {winner.coWinner} ({winner.coWinnerClub})
          </span>
        )}
      </p>
    );
  };

  const renderScore = (winner: TournamentWinner): any => {
    if (winner.isNet) {
      return (
        <p>
          Score: {winner.score}
          <span>*</span>
        </p>
      );
    } else {
      return <p>Score: {winner.score}</p>;
    }
  };

  return (
    <div key={props.winner.id}>
      <h5 className="text-secondary">{props.winner.flightOrDivision}</h5>
      {renderWinner(props.winner)}
      {renderScore(props.winner)}
    </div>
  );
};

export default EventWinnerView;
