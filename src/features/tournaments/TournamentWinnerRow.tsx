import React, { useState } from "react";

import { TiDocumentText, TiEdit } from "react-icons/ti";

import Notes from "../../components/Notes";
import usePermissions from "../../utilities/Permissions";
import { TournamentWinnerProps } from "./tournamentPropTypes";
import TournamentWinnerEditModal from "./TournamentWinnerEditModal";

const TournamentWinnerRow: React.FC<TournamentWinnerProps> = (props) => {
  const { winner } = props;
  const permissions = usePermissions();
  const [showNote, updateShowNote] = useState(false);
  const [doEdit, updateDoEdit] = useState(false);

  const handleClose = () => {
    updateDoEdit(false);
  };

  return (
    <React.Fragment>
      <TournamentWinnerEditModal show={doEdit} winner={winner} onClose={handleClose} />
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
          <td colSpan={permissions.canEditTournamentHistory() ? 7 : 6}>
            <Notes>{winner.notes}</Notes>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default TournamentWinnerRow;
