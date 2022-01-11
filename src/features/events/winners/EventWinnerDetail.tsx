import React from "react";

import { TournamentWinnerDetailProps } from "features/tournaments/tournamentPropTypes";

import { CloseableEditContainer, CloseHandle } from "../../../components/WithEdit";
import usePermissions from "../../../utilities/Permissions";
import TournamentWinnerEdit from "../../tournaments/TournamentWinnerEdit";
import EventWinnerView from "./EventWinnerView";

const EventWinnerDetail: React.FC<TournamentWinnerDetailProps> = (props) => {
  const { winner, edit, onClose } = props;
  const permissions = usePermissions();
  const closeRef = React.useRef<CloseHandle>();

  const handleClose = () => {
    closeRef.current.close();
    onClose();
  };

  return (
    <CloseableEditContainer
      ref={closeRef}
      initEdit={edit}
      canEdit={permissions.canManageEvent()}
      viewComponent={<EventWinnerView winner={winner} />}
      editComponent={<TournamentWinnerEdit winner={winner} onClose={handleClose} />}
    />
  );
};

export default EventWinnerDetail;
