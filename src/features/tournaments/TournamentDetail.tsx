import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditableDiv from "../../components/EditableDiv";
import { Tournament } from "../../models/Events";
import { IApplicationState } from "../../store";
import TournamentActions from "../../store/TournamentActions";
import TournamentEdit from "./TournamentEdit";
import TournamentView, { ITournamentViewProps } from "./TournamentView";

const TournamentDetail: React.FC<ITournamentViewProps> = (props) => {
    const { tournament } = props;
    const session = useSelector((state: IApplicationState) => state.session);
    const dispatch = useDispatch();

    const saveTournament = useCallback(
        (tournament: Tournament) => dispatch(TournamentActions.SaveTournament(tournament)),
        [dispatch]
    )

    return (
        <React.Fragment>
            <EditableDiv initEdit={false} canEdit={session.user.isFullEditor}
                viewComponent={<TournamentView tournament={tournament} />}
                editComponent={<TournamentEdit tournament={tournament} Save={saveTournament} />}>
            </EditableDiv>
        </React.Fragment>
    );
}

export default TournamentDetail;
