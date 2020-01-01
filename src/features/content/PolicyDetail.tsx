import React from 'react';
import { useSelector } from 'react-redux';

import EditableDiv from '../../components/EditableDiv';
import { IApplicationState } from '../../store';
import PolicyEdit, { IPolicyEditProps } from './PolicyEdit';
import PolicyView from './PolicyView';

export interface IPolicyDetailProps extends IPolicyEditProps {
    edit: boolean,
};

const PolicyDetail: React.FC<IPolicyDetailProps> = (props) => {
    const { policy, edit, Cancel, Delete, Save } = props;
    const session = useSelector((state: IApplicationState) => state.session);
    return (
        <EditableDiv initEdit={edit} canEdit={session.user.isFullEditor}
            viewComponent={<PolicyView policy={policy} />}
            editComponent={<PolicyEdit policy={policy} Cancel={Cancel} Delete={Delete} Save={Save} />}>
        </EditableDiv>
    );
}

export default PolicyDetail;