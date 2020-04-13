import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import EditableDiv from "../../components/EditableDiv";
import { Tournament } from "../../models/Events";
import TournamentActions from "../../store/TournamentActions";
import usePermissions from "../../utilities/Permissions";
import TournamentEdit from "./TournamentEdit";
import TournamentView, { ITournamentViewProps } from "./TournamentView";

const TournamentDetail: React.FC<ITournamentViewProps> = (props) => {
    const { tournament } = props;
    const dispatch = useDispatch();
    const permissions = usePermissions();

    const saveTournament = useCallback(
        (tournament: Tournament) => dispatch(TournamentActions.SaveTournament(tournament)),
        [dispatch]
    );

    return (
        <React.Fragment>
            <EditableDiv
                initEdit={false}
                canEdit={permissions.canEditPageContent()}
                viewComponent={<TournamentView tournament={tournament} />}
                editComponent={<TournamentEdit tournament={tournament} Save={saveTournament} />}
            />
        </React.Fragment>
    );
};

export default TournamentDetail;
