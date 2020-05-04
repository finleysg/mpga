import React, { useCallback, useState } from "react";
import { TiDocumentText, TiEdit } from "react-icons/ti";
import { useDispatch } from "react-redux";

import { TournamentWinner } from "../../models/Events";
import TournamentWinnerActions from "../../store/TournamentWinnerActions";
import MatchPlayHistoryEditModal from "./MatchPlayHistoryEditModal";
import { ITournamentWinnerRowProps } from "../tournaments/TournamentWinnerRow";
import usePermissions from "../../utilities/Permissions";
import Notes from "../../components/Notes";

const MatchPlayHistoryRow: React.FC<ITournamentWinnerRowProps> = (props) => {
    const { tournament, winner } = props;
    const dispatch = useDispatch();
    const [showNote, updateShowNote] = useState(false);
    const [doEdit, updateDoEdit] = useState(false);
    const permissions = usePermissions();

    const saveWinner = useCallback(
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
            <MatchPlayHistoryEditModal show={doEdit} winner={winner} Save={saveWinner} Cancel={cancelEdit} />
            <tr>
                <td>{winner.year}</td>
                <td>{winner.flightOrDivision}</td>
                <td>{winner.winner}</td>
                <td>{winner.coWinner || "unknown"}</td>
                <td>{winner.score}</td>
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

export default MatchPlayHistoryRow;
