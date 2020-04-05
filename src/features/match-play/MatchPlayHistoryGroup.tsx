import React from "react";

import { ITournamentWinnerGroup, TournamentWinner } from "../../models/Events";
import MatchPlayHistoryRow from "./MatchPlayHistoryRow";

export interface IMatchPlayHistoryGroupProps {
    group: ITournamentWinnerGroup;
}
const MatchPlayHistoryGroup: React.FC<IMatchPlayHistoryGroupProps> = (props) => {
    return (
        <React.Fragment>
            {props.group.winners.map((winner: TournamentWinner) => {
                return <MatchPlayHistoryRow key={winner.id} tournament={props.group.tournament} winner={winner} />;
            })}
        </React.Fragment>
    );
};

export default MatchPlayHistoryGroup;
