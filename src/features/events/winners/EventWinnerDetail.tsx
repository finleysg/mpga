import React from "react";

import WithEdit from "../../../components/WithEdit";
import { TournamentWinner } from "../../../models/Events";
import { TournamentWinnerForm } from "../../../store/TournamentWinnerActions";
import usePermissions from "../../../utilities/Permissions";
import TournamentWinnerEdit from "../../tournaments/TournamentWinnerEdit";
import EventWinnerView, { IEventWinnerViewProps } from "./EventWinnerView";

export interface IEventWinnerDetailProps extends IEventWinnerViewProps {
  edit: boolean;
  Cancel: () => void;
  Save: (winner: TournamentWinner) => void;
}

const EventWinnerDetail: React.FC<IEventWinnerDetailProps> = (props) => {
  const { winner, edit, Cancel, Save } = props;
  const permissions = usePermissions();

  return (
    <WithEdit
      formName={TournamentWinnerForm}
      initEdit={edit}
      canEdit={permissions.canManageEvent()}
      viewComponent={<EventWinnerView winner={winner} />}
      editComponent={<TournamentWinnerEdit winner={winner} onClose={Cancel} />}
    />
  );
};

export default EventWinnerDetail;
