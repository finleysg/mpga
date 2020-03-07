import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ITournamentWinnerGroup } from '../../models/Events';
import { IApplicationState } from '../../store';
import TournamentWinnerActions from '../../store/TournamentWinnerActions';
import TournamentHistoryTable from './TournamentHistoryTable';

export interface ITournamentProps {
    tournamentName: string;
}

const TournamentHistoryList: React.FC<ITournamentProps> = (props) => {
    const { tournamentName } = props;
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.winners);

    useEffect(() => {
        if (tournamentName) {
            dispatch(TournamentWinnerActions.LoadTournamentWinners(tournamentName));
        }
    }, [dispatch, tournamentName]);

    return (
        <div>
            {state.winners.map((group: ITournamentWinnerGroup) => 
                <TournamentHistoryTable key={group.year} group={group} />)}
        </div>
    );
}

export default TournamentHistoryList;
