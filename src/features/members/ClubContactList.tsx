import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import { ClubContact } from '../../models/Clubs';
import { IApplicationState } from '../../store';
import MemberClubActions from '../../store/MemberClubActions';
import ClubContactDetail from './ClubContactDetail';
import { IClubContactData } from './ClubContactEdit';
import AddButton from '../../components/AddButton';

const ClubContactList: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.memberClubs);
    const session = useSelector((state: IApplicationState) => state.session);
    const canAdd = state.selectedClub?.clubContacts.findIndex(cc => cc.id === 0) < 0; // no pending add

    // Info on why we memoize the callback passed to a child component
    // https://react-redux.js.org/next/api/hooks#usedispatch
    const saveClubContact = useCallback(
        (id: number, clubContact: IClubContactData) => dispatch(MemberClubActions.SaveClubContact(id, clubContact)),
        [dispatch]
    )

    const removeClubContact = useCallback(
        (id: number) => dispatch(MemberClubActions.CancelNewClubContact()), // TODO
        [dispatch]
    )

    return <div>
        <div>
            <h3 className="text-primary">Club Contacts</h3>
            {session.user.isFullEditor && canAdd && 
            <AddButton AddRequested={() => dispatch(MemberClubActions.AppendNewClubContact())} />}
        </div>
        {state.isBusy ?
            <Loading /> :
            state.selectedClub?.clubContacts.map((cc: ClubContact) => {
                return <ClubContactDetail key={cc.id}
                    clubContact={cc}
                    edit={cc.id === 0}
                    Cancel={() => dispatch(MemberClubActions.CancelNewClubContact())}
                    Delete={removeClubContact}
                    Save={saveClubContact} />
            })}
    </div>
}

export default ClubContactList;
