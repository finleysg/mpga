import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditableDiv from '../../components/EditableDiv';
import Loading from '../../components/Loading';
import { IApplicationState } from '../../store';
import TournamentActions from '../../store/TournamentActions';
import { Tournament } from '../../models/Events';
import TournamentHistoryOverview from './TournamentHistoryOverview';
import TournamentHistoryEdit from './TournamentHistoryEdit';

export interface ITournamentHistoryDetailProps {
    tournamentName: string;
}

const TournamentHistoryDetail: React.FC<ITournamentHistoryDetailProps> = (props) => {
    const { tournamentName } = props;
    const state = useSelector((state: IApplicationState) => state.tournaments);
    const session = useSelector((state: IApplicationState) => state.session);
    const dispatch = useDispatch();

    const getPage = () => {
        return state.tournaments.get(tournamentName);
    }

    const saveTournament = useCallback(
        (tournament: Tournament) => dispatch(TournamentActions.SaveTournament(tournament)),
        [dispatch]
    )

    return (
        <>
            {state.isBusy ?
            <Loading /> :
            <EditableDiv initEdit={false} canEdit={session.user.isFullEditor}
                viewComponent={<TournamentHistoryOverview tournament={getPage() || new Tournament({})} />}
                editComponent={<TournamentHistoryEdit tournament={getPage() || new Tournament({})} Save={saveTournament} />}>
            </EditableDiv>}
        </>
    );
}

export default TournamentHistoryDetail;
