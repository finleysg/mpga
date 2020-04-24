import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { EventLink } from "../../../models/Events";
import { IApplicationState } from "../../../store";
import EventActions from "../../../store/EventActions";
import EventLinkLinkDetail from "./EventLinkDetail";
import { ILinkRenderProps, LinkViewType } from "./EventLinkView";

export interface IEventLinkProps {
    linkType: string;
    title: string;
}

const render = {
    viewType: LinkViewType.Link,
    external: true,
    variant: "secondary",
} as ILinkRenderProps;

const EventLinkList: React.FC<IEventLinkProps> = (props) => {
    const eventState = useSelector((state: IApplicationState) => state.events);
    const dispatch = useDispatch();
    const links = eventState.currentEvent.links?.filter((l) => l.linkType === props.linkType);

    const deleteEventLink = useCallback((eventLink: EventLink) => dispatch(EventActions.DeleteEventLink(eventLink)), [
        dispatch,
    ]);

    const saveEventLink = useCallback((eventLink: EventLink) => dispatch(EventActions.SaveEventLink(eventLink)), [
        dispatch,
    ]);

    const renderLink = (link: EventLink) => {
        return (
            <EventLinkLinkDetail
                key={link.id}
                eventLink={link}
                render={render}
                edit={link.id === 0}
                Cancel={() => dispatch(EventActions.CancelNewEventLink())}
                Delete={deleteEventLink}
                Save={saveEventLink}
            />
        );
    };

    return (
        <div>
            {links && links.length > 0 && (
                <React.Fragment>
                    <h5 className="text-primary mt-1">{props.title}</h5>
                    {links?.map((link: EventLink) => renderLink(link))}
                </React.Fragment>
            )}
        </div>
    );
};

export default EventLinkList;
