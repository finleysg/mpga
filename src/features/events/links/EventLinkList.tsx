import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../../components/Loading';
import { EventLink } from '../../../models/Events';
import { IApplicationState } from '../../../store';
import EventActions from '../../../store/EventActions';
import EventLinkLinkDetail from './EventLinkDetail';
import { ILinkRenderProps } from './EventLinkView';

export interface IEventLinkProps {
    linkType: string;
    render: ILinkRenderProps;
}

const EventLinkList: React.FC<IEventLinkProps> = props => {
    const state = useSelector((state: IApplicationState) => state.events);
    const session = useSelector((state: IApplicationState) => state.session);
    const dispatch = useDispatch();
    const canAdd = state.currentEvent?.links?.findIndex(l => l.id === 0) || -1 < 0; // no pending add

    const deleteEventLink = useCallback((eventLink: EventLink) => dispatch(EventActions.DeleteEventLink(eventLink)), [
        dispatch,
    ]);

    const saveEventLink = useCallback((eventLink: EventLink) => dispatch(EventActions.SaveEventLink(eventLink)), [
        dispatch,
    ]);

    return (
        <div>
            {!state.currentEvent ? (
                <Loading />
            ) : (
                state.currentEvent.links
                    ?.filter(l => l.linkType === props.linkType)
                    ?.map((link: EventLink) => {
                        return (
                            <EventLinkLinkDetail
                                key={link.id}
                                eventLink={link}
                                render={props.render}
                                edit={link.id === 0}
                                Cancel={() => dispatch(EventActions.CancelNewEventLink())}
                                Delete={deleteEventLink}
                                Save={saveEventLink}
                            />
                        );
                    })
            )}
            {session.user.isFullEditor && (
                <Button
                    variant="link"
                    className="text-warning"
                    disabled={!canAdd}
                    onClick={() => dispatch(EventActions.AddNewEventLink(props.linkType))}>
                    New Link
                </Button>
            )}
        </div>
    );
};

export default EventLinkList;
