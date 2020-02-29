import React, { useCallback } from 'react';
import MemberClubActions from '../../store/MemberClubActions';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from '../../store';
import { Club } from '../../models/Clubs';
import MemberClubView from './MemberClubView';
import EditableDiv from '../../components/EditableDiv';
import MemberClubEdit from './MemberClubEdit';
import Loading from '../../components/Loading';

const MemberClubDetail: React.FC = () => {
    const state = useSelector((state: IApplicationState) => state.memberClubs);
    const session = useSelector((state: IApplicationState) => state.session);
    const dispatch = useDispatch();

    const saveClub = useCallback(
        (club: Club) => dispatch(MemberClubActions.SaveMemberClub(club)),
        [dispatch]
    )

    return (
        <>
            {state.isBusy ?
            <Loading /> :
            <EditableDiv initEdit={false} canEdit={session.user.isFullEditor}
                viewComponent={<MemberClubView club={state.selectedClub} membership={state.mostRecentMembership} />}
                editComponent={<MemberClubEdit club={state.selectedClub} Save={saveClub} />}>
            </EditableDiv>}
        </>
    );
}

export default MemberClubDetail;
