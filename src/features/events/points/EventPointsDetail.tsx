import * as React from 'react';
import { useSelector } from 'react-redux';

import EditableDiv from '../../../components/EditableDiv';
import { IApplicationState } from '../../../store';
import EventPointsEdit, { IEventPointsEditProps } from './EventPointsEdit';
import EventPointsView from './EventPointsView';

export interface IEventPointsDetailProps extends IEventPointsEditProps {
    edit: boolean,
}

const EventPointsDetail: React.FunctionComponent<IEventPointsDetailProps> = (props) => {
    const session = useSelector((state: IApplicationState) => state.session);
    const { points, edit, Cancel, Save, Delete } = props;

  return (
        <EditableDiv
            initEdit={edit}
            canEdit={session.user.isFullEditor}
            viewComponent={<EventPointsView points={points} />}
            editComponent={<EventPointsEdit points={points} Cancel={Cancel} Save={Save} Delete={Delete} />}
        />
    );
};

export default EventPointsDetail;
