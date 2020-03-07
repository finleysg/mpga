import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tournament } from '../../models/Events';
import { IApplicationState } from '../../store';
import TournamentActions from '../../store/TournamentActions';
import TournamentDetail from './TournamentDetail';
import Loading from '../../components/Loading';

const TournamentList: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.tournament);

    useEffect(() => {
        dispatch(TournamentActions.LoadTournaments());
    }, [dispatch]);

    return (
        <div>
            {state.isBusy ?
            <Loading /> :
            state.tournaments.map((t: Tournament) => 
                <TournamentDetail tournament={t} />)}
        </div>
    );
}

export default TournamentList;
