import React, { useCallback, useState } from 'react';
import { TiDocumentText, TiEdit } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';

import { TournamentWinner } from '../../models/Events';
import { IApplicationState } from '../../store';
import TournamentWinnerActions from '../../store/TournamentWinnerActions';
import TournamentWinnerEdit from './TournamentWinnerEdit';

export interface ITournamentWinnerRowProps {
    winner: TournamentWinner,
}

const TournamentWinnerRow: React.FC<ITournamentWinnerRowProps> = (props) => {
    const { winner } = props;
    const dispatch = useDispatch();
    const [showNote, updateShowNote] = useState(false);
    const [doEdit, updateDoEdit] = useState(false);
    const session = useSelector((state: IApplicationState) => state.session);

    const saveTournament = useCallback(
        (winner: TournamentWinner) => {
            dispatch(TournamentWinnerActions.SaveTournamentWinner(winner));
            updateDoEdit(false);
        },
        [dispatch]
    )

    const deleteWinner = useCallback(
        (winner: TournamentWinner) => {
            dispatch(TournamentWinnerActions.DeleteTournamentWinner(winner));
            updateDoEdit(false);
        },
        [dispatch]
    )

    const cancelEdit = () => {
        updateDoEdit(false);
    }

    return (
        <React.Fragment>
            {doEdit &&
            <tr>
                <td>Winner details:</td>
                <td>
                    <TournamentWinnerEdit winner={winner} Save={saveTournament} Cancel={cancelEdit} Delete={deleteWinner} />
                </td>
                <td  colSpan={3}></td>
            </tr>
            }
            {!doEdit &&
            <tr>
                <td>{winner.flightOrDivision}</td>
                <td>{winner.winnersFormatted}</td>
                <td>{winner.scoreFormatted}</td>
                <td className="clickable" onClick={() => updateShowNote(!showNote)}>{winner.notes && <TiDocumentText size={18} color={"teal"} />}</td>
                {session.user.isFullEditor && <td className="clickable" onClick={() => updateDoEdit(!doEdit)}><TiEdit size={18} color={"teal"} /></td>}
            </tr>}
            {winner.notes && showNote && !doEdit && 
                <tr>
                    <td colSpan={session.user.isFullEditor ? 5 : 4}>{winner.notes}</td>
                </tr>
            }
        </React.Fragment>
    );
}

export default TournamentWinnerRow;
