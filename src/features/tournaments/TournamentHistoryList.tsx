import React from 'react';
import { ITournamentWinnerGroup } from '../../models/Events';
import TournamentHistoryTable from './TournamentHistoryTable';

export interface ITournamentHistoryListProps {
    groups: ITournamentWinnerGroup[];
}

const TournamentHistoryList: React.FC<ITournamentHistoryListProps> = (props) => {
    return (
        <div>
            {props.groups.map((group: ITournamentWinnerGroup) => <TournamentHistoryTable group={group} />)}
        </div>
    );
}

export default TournamentHistoryList;
