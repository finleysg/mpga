import React from "react";

import { ITournamentWinnerGroup, TournamentWinner } from "../../models/Events";
import TournamentWinnerRow from "./TournamentWinnerRow";

export interface ITournamentWinnerGroupProps {
    group: ITournamentWinnerGroup;
}
const TournamentWinnerGroup: React.FC<ITournamentWinnerGroupProps> = (props) => {
    return (
        <React.Fragment>
            {props.group.winners.map((winner: TournamentWinner) => {
                return <TournamentWinnerRow key={winner.id} tournament={props.group.tournament} winner={winner} />;
            })}
        </React.Fragment>
    );
};

export default TournamentWinnerGroup;
