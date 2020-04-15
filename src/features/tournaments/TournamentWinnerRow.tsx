import React, { useCallback, useState } from "react";
import { TiDocumentText, TiEdit } from "react-icons/ti";
import { useDispatch } from "react-redux";

import { Tournament, TournamentWinner } from "../../models/Events";
import TournamentWinnerActions from "../../store/TournamentWinnerActions";
import usePermissions from "../../utilities/Permissions";
import TournamentWinnerEditModal from "./TournamentWinnerEditModal";
import { Notes } from "../awards/AwardWinnerView";

export interface ITournamentWinnerRowProps {
    tournament: Tournament;
    winner: TournamentWinner;
}

const TournamentWinnerRow: React.FC<ITournamentWinnerRowProps> = (props) => {
    const { tournament, winner } = props;
    const dispatch = useDispatch();
    const permissions = usePermissions();
    const [showNote, updateShowNote] = useState(false);
    const [doEdit, updateDoEdit] = useState(false);

    const saveTournament = useCallback(
        (winner: TournamentWinner) => {
            dispatch(TournamentWinnerActions.SaveTournamentWinner(tournament, winner));
            updateDoEdit(false);
        },
        [dispatch, tournament]
    );

    const cancelEdit = () => {
        updateDoEdit(false);
    };

    return (
        <React.Fragment>
            <TournamentWinnerEditModal show={doEdit} winner={winner} Save={saveTournament} Cancel={cancelEdit} />
            <tr>
                <td>{winner.year}</td>
                <td>{winner.location}</td>
                <td>{winner.flightOrDivision}</td>
                <td>{winner.winnersFormatted}</td>
                <td>{winner.scoreFormatted}</td>
                <td className="clickable text-secondary" onClick={() => updateShowNote(!showNote)}>
                    {winner.notes && <TiDocumentText size={18} color={"primary"} />}
                </td>
                {permissions.canEditTournamentHistory() && (
                    <td className="clickable text-warning" onClick={() => updateDoEdit(!doEdit)}>
                        <TiEdit size={18} color={"warning"} />
                    </td>
                )}
            </tr>
            {winner.notes && showNote && !doEdit && (
                <tr>
                    <td colSpan={permissions.canEditTournamentHistory() ? 7 : 6}><Notes>{winner.notes}</Notes></td>
                </tr>
            )}
        </React.Fragment>
    );
};

export default TournamentWinnerRow;
