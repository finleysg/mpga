import * as React from 'react';
import { useSelector } from 'react-redux';

import EditableDiv from '../../../components/EditableDiv';
import { IApplicationState } from '../../../store';
import EventPolicyEdit, { IEventPolicyEditProps } from './EventPolicyEdit';
import EventPolicyView from './EventPolicyView';

export interface IEventPolicyDetailProps extends IEventPolicyEditProps {
    edit: boolean,
}

const EventPolicyDetail: React.FunctionComponent<IEventPolicyDetailProps> = (props) => {
    const session = useSelector((state: IApplicationState) => state.session);
    const { policy, edit, Cancel, Save, Remove } = props;

  return (
        <EditableDiv
            initEdit={edit}
            canEdit={session.user.isFullEditor}
            viewComponent={<EventPolicyView policy={policy} />}
            editComponent={<EventPolicyEdit policy={policy} Cancel={Cancel} Save={Save} Remove={Remove} />}
        />
    );
};

export default EventPolicyDetail;
