import React, { useCallback, useState } from "react";
import { TiDocumentText, TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

import { TournamentWinner } from "../../models/Events";
import { IApplicationState } from "../../store";
import TournamentWinnerActions from "../../store/TournamentWinnerActions";
import MatchPlayHistoryEditModal from "./MatchPlayHistoryEditModal";
import { ITournamentWinnerRowProps } from "../tournaments/TournamentWinnerRow";

const MatchPlayHistoryRow: React.FC<ITournamentWinnerRowProps> = (props) => {
    const { tournament, winner } = props;
    const dispatch = useDispatch();
    const [showNote, updateShowNote] = useState(false);
    const [doEdit, updateDoEdit] = useState(false);
    const session = useSelector((state: IApplicationState) => state.session);

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
                <td className="clickable" onClick={() => updateShowNote(!showNote)}>
                    {winner.notes && <TiDocumentText size={18} color={"teal"} />}
                </td>
                {session.user.isFullEditor && (
                    <td className="clickable" onClick={() => updateDoEdit(!doEdit)}>
                        <TiEdit size={18} color={"gold"} />
                    </td>
                )}
            </tr>
            {winner.notes && showNote && !doEdit && (
                <tr>
                    <td colSpan={session.user.isFullEditor ? 5 : 4}>{winner.notes}</td>
                </tr>
            )}
        </React.Fragment>
    );
};

export default MatchPlayHistoryRow;