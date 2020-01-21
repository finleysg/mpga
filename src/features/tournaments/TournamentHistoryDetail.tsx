import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditableDiv from '../../components/EditableDiv';
import Loading from '../../components/Loading';
import { IApplicationState } from '../../store';
import TournamentActions from '../../store/TournamentActions';
import { Tournament } from '../../models/Events';
import TournamentHistoryOverview from './TournamentHistoryOverview';
import TournamentHistoryEdit from './TournamentHistoryEdit';

export interface ITournamentProps {
    tournamentName: string;
}

const TournamentHistoryDetail: React.FC<ITournamentProps> = (props) => {
    const { tournamentName } = props;
    const state = useSelector((state: IApplicationState) => state.tournament);
    const session = useSelector((state: IApplicationState) => state.session);
    const dispatch = useDispatch();

    useEffect(() => {
        if (tournamentName) {
            dispatch(TournamentActions.LoadTournament(tournamentName));
        }
    }, [dispatch, tournamentName]);

    const saveTournament = useCallback(
        (tournament: Tournament) => dispatch(TournamentActions.SaveTournament(tournament)),
        [dispatch]
    )

    return (
        <React.Fragment>
            {state.isBusy ?
            <Loading /> :
            <EditableDiv initEdit={false} canEdit={session.user.isFullEditor}
                viewComponent={<TournamentHistoryOverview tournament={state.tournament} />}
                editComponent={<TournamentHistoryEdit tournament={state.tournament} Save={saveTournament} />}>
            </EditableDiv>}
        </React.Fragment>
    );
}

export default TournamentHistoryDetail;
