import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IApplicationState } from '../../store';
import TournamentActions from '../../store/TournamentActions';
import { useParams } from 'react-router-dom';

const TournamentLoader: React.FC = () => {
    let { name } = useParams();
    const state = useSelector((state: IApplicationState) => state.tournament);
    const dispatch = useDispatch();
    const systemName = state?.currentTournament.systemName;

    useEffect(() => {
        if (name && systemName !== name) {
            dispatch(TournamentActions.LoadTournament(name));
        }
    }, [dispatch, name, systemName]);

    return <></>;
}

export default TournamentLoader;
