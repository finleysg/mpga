import React, { useState } from "react";

import { TiDocumentText, TiEdit } from "react-icons/ti";

import Notes from "../../components/Notes";
import usePermissions from "../../utilities/Permissions";
import { TournamentWinnerViewProps } from "./tournamentPropTypes";

const TournamentWinnerRow: React.FC<TournamentWinnerViewProps> = (props) => {
  const { winner, onEdit } = props;
  const permissions = usePermissions();
  const [showNote, updateShowNote] = useState(false);

  return (
    <React.Fragment>
      <tr>
        <td>{winner.year}</td>
        <td>{winner.location}</td>
        <td>{winner.flightOrDivision}</td>
        <td>{winner.winnersFormatted}</td>
        <td>{winner.scoreFormatted}</td>
        <td className="clickable text-secondary" onClick={() => updateShowNote(!showNote)}>
          {winner.notes && <TiDocumentText size={18} color={"primary"} />}
        </td>
        {permissions.canEditTournamentHistory() ? (
          <td className="clickable text-warning" onClick={() => onEdit(winner)}>
            <TiEdit size={18} color={"warning"} />
          </td>
        ) : null}
      </tr>
      {winner.notes && showNote ? (
        <tr>
          <td colSpan={permissions.canEditTournamentHistory() ? 7 : 6}>
            <Notes>{winner.notes}</Notes>
          </td>
        </tr>
      ) : null}
    </React.Fragment>
  );
};

export default TournamentWinnerRow;
