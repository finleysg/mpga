import React from 'react';
import { useSelector } from 'react-redux';

import EditableDiv from '../../components/EditableDiv';
import { IApplicationState } from '../../store';
import AnnouncementEdit, { IAnnouncementEdit } from './AnnouncementEdit';
import AnnouncementView from './AnnouncementView';

export interface IAnnouncementDetail extends IAnnouncementEdit {
    edit: boolean,
};

const AnnouncementDetail: React.FC<IAnnouncementDetail> = (props) => {
    const { announcement, edit, Cancel, Save } = props;
    const session = useSelector((state: IApplicationState) => state.session);
    return (
        <EditableDiv initEdit={edit} canEdit={session.user.isFullEditor}
            viewComponent={<AnnouncementView announcement={announcement} />}
            editComponent={<AnnouncementEdit announcement={announcement} Cancel={Cancel} Save={Save} />}>
        </EditableDiv>
    );
}

export default AnnouncementDetail;
