import React, { useState } from 'react';
import { TiDocumentText, TiEdit } from 'react-icons/ti';
import { useSelector } from 'react-redux';

import { TournamentWinner } from '../../models/Events';
import { IApplicationState } from '../../store';

export interface ITournamentHistoryRowProps {
    winner: TournamentWinner
}

const TournamentHistoryRow: React.FC<ITournamentHistoryRowProps> = (props) => {
    const {winner} = props;
    const [showNote, updateShowNote] = useState(false);
    const session = useSelector((state: IApplicationState) => state.session);
    return (
        <>
        <tr>
            <td>{winner.winnersFormatted}</td>
            <td>{winner.flightOrDivision}</td>
            <td>{winner.scoreFormatted}</td>
            <td className="clickable" onClick={() => updateShowNote(!showNote)}>{winner.notes && <TiDocumentText size={18} color={"teal"} />}</td>
            {session.user.isFullEditor && <td className="clickable"><TiEdit size={18} color={"teal"} /></td>}
        </tr>
        {winner.notes && showNote &&
            <tr>
                <td colSpan={session.user.isFullEditor ? 5 : 4}>{winner.notes}</td>
            </tr>
        }
        </>
    );
}

export default TournamentHistoryRow;
