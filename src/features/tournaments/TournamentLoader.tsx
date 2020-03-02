import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IApplicationState } from '../../store';
import TournamentActions from '../../store/TournamentActions';
import { useParams } from 'react-router-dom';

const TournamentLoader: React.FC = () => {
    let { name } = useParams();
    const state = useSelector((state: IApplicationState) => state.tournament);
    const dispatch = useDispatch();

    useEffect(() => {
        if (name && state?.tournament.systemName !== name) {
            dispatch(TournamentActions.LoadTournament(name));
        }
    }, [dispatch, name]);

    return <></>;
}

export default TournamentLoader;
