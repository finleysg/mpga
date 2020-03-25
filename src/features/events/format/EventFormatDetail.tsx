import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditableDiv from '../../../components/EditableDiv';
import { EventDetail } from '../../../models/Events';
import { IApplicationState } from '../../../store';
import EventActions from '../../../store/EventActions';
import EventFormatEdit from './EventFormatEdit';
import EventFormatView from './EventFormatView';

interface IEventDetailProps {
    eventDetail: EventDetail;
}

const EventFormatDetail: React.FunctionComponent<IEventDetailProps> = (props) => {
    const { eventDetail } = props;
    const session = useSelector((state: IApplicationState) => state.session);
    const dispatch = useDispatch();

    const saveFormat = useCallback(
        (eventDetail: EventDetail) => dispatch(EventActions.SaveEvent(eventDetail)),
        [dispatch]
    )

    return (
        <EditableDiv initEdit={false} canEdit={session.user.isFullEditor}
            viewComponent={<EventFormatView eventDetail={eventDetail} />}
            editComponent={<EventFormatEdit eventDetail={eventDetail} Save={saveFormat} />}>
        </EditableDiv>
    );
};

export default EventFormatDetail;
