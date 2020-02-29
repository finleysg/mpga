import React from 'react';
import { useSelector } from 'react-redux';

import EditableDiv from '../../components/EditableDiv';
import { IApplicationState } from '../../store';
import ClubContactEdit, { IClubContactEditProps } from './ClubContactEdit';
import ClubContactView from './ClubContactView';

export interface IClubContactDetail extends IClubContactEditProps {
    edit: boolean,
}

const ClubContactDetail: React.FC<IClubContactDetail> = (props) => {
    const { clubContact, edit, Cancel, Save, Delete } = props;
    const session = useSelector((state: IApplicationState) => state.session);
    return (
        <EditableDiv initEdit={edit} canEdit={session.user.isFullEditor}
            viewComponent={<ClubContactView clubContact={clubContact} />}
            editComponent={<ClubContactEdit clubContact={clubContact} Cancel={Cancel} Save={Save} Delete={Delete} />}>
        </EditableDiv>
    );
};

export default ClubContactDetail;
