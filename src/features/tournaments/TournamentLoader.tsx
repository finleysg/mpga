import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IApplicationState } from '../../store';
import TournamentActions from '../../store/TournamentActions';

export interface ITournamentLoaderProps {
    name: string;
    resultDocuments?: boolean;
}

const TournamentLoader: React.FC<ITournamentLoaderProps> = (props) => {
    const state = useSelector((state: IApplicationState) => state.tournament);
    const dispatch = useDispatch();
    const systemName = state?.currentTournament.systemName;

    useEffect(() => {
        if (props.name && systemName !== props.name) {
            dispatch(TournamentActions.LoadTournament(props.name, props.resultDocuments!));
        }
    }, [dispatch, props.name, props.resultDocuments, systemName]);

    return <></>;
}

export default TournamentLoader;
