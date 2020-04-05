import React, { useCallback, useState } from "react";
import { TiDocumentText, TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

import { TournamentWinner, Tournament } from '../../models/Events';
import { IApplicationState } from "../../store";
import TournamentWinnerActions from "../../store/TournamentWinnerActions";
import TournamentWinnerEditModal from "./TournamentWinnerEditModal";

export interface ITournamentWinnerRowProps {
    tournament: Tournament;
    winner: TournamentWinner;
}

const TournamentWinnerRow: React.FC<ITournamentWinnerRowProps> = (props) => {
    const { tournament, winner } = props;
    const dispatch = useDispatch();
    const [showNote, updateShowNote] = useState(false);
    const [doEdit, updateDoEdit] = useState(false);
    const session = useSelector((state: IApplicationState) => state.session);

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
                    <td colSpan={session.user.isFullEditor ? 7 : 6}>{winner.notes}</td>
                </tr>
            )}
        </React.Fragment>
    );
};

export default TournamentWinnerRow;
