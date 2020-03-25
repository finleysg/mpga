import React from "react";
import { useSelector } from "react-redux";
import { TournamentWinner } from "../../../models/Events";
import { IApplicationState } from "../../../store";
import EditableDiv from "../../../components/EditableDiv";
import EventWinnerView, { IEventWinnerViewProps } from "./EventWinnerView";
import TournamentWinnerEdit from '../../tournaments/TournamentWinnerEdit';

export interface IEventWinnerDetailProps extends IEventWinnerViewProps {
    edit: boolean,
    Cancel: () => void;
    Save: (winner: TournamentWinner) => void;
    Delete: (winner: TournamentWinner) => void;
}

const EventWinnerDetail: React.FC<IEventWinnerDetailProps> = (props) => {
    const session = useSelector((state: IApplicationState) => state.session);
    const { winner, edit, Cancel, Delete, Save } = props;

  return (
        <EditableDiv
            initEdit={edit}
            canEdit={session.user.isFullEditor}
            viewComponent={<EventWinnerView winner={winner} />}
            editComponent={<TournamentWinnerEdit winner={winner} Cancel={Cancel} Save={Save} Delete={Delete} />}
        />
    );
};

export default EventWinnerDetail;
