import * as React from "react";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import EditableDiv from "../../../components/EditableDiv";
import EventLinkEdit, { IEventLinkEditProps } from "./EventLinkEdit";
import EventLinkView, { ILinkRenderProps } from "./EventLinkView";

export interface IEventLinkDetailProps extends IEventLinkEditProps {
    edit: boolean,
    render: ILinkRenderProps;
}

const EventLinkDetail: React.FunctionComponent<IEventLinkDetailProps> = (props) => {
    const session = useSelector((state: IApplicationState) => state.session);
    const { eventLink, edit, render, Cancel, Save, Delete } = props;

  return (
        <EditableDiv
            initEdit={edit}
            canEdit={session.user.isFullEditor}
            viewComponent={<EventLinkView eventLink={eventLink} render={render} />}
            editComponent={<EventLinkEdit eventLink={eventLink} Cancel={Cancel} Save={Save} Delete={Delete} />}
        />
    );
};

export default EventLinkDetail;
