import React, { useCallback, useState } from 'react';

import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../app-store';
import LoadingContainer from '../../components/LoadingContainer';
import { ClubContact } from '../../models/Clubs';
import { IApplicationState } from '../../store';
import {
  addNewClubContact,
  appendNewClubContact,
  cancelNewClubContact,
} from '../../store/MemberClubSlice';
import usePermissions from '../../utilities/Permissions';
import { IContactData } from '../contacts/ContactApi';
import ContactSearch from '../contacts/ContactSearch';
import ClubContactDetail from './ClubContactDetail';
import { IClubContactData } from './ClubContactEdit';

const ClubContactList: React.FC = () => {
  const dispatch = useAppDispatch();
  const permissions = usePermissions();
  const [findContact, setFindContact] = useState(false);
  const state = useSelector((state: IApplicationState) => state.memberClubs);
  const canAdd = state.selectedClub?.clubContacts.findIndex((cc) => cc.id === 0) < 0; // no pending add

  // Info on why we memoize the callback passed to a child component
  // https://react-redux.js.org/next/api/hooks#usedispatch
  const saveClubContact = useCallback(
    (id: number, clubContact: IClubContactData) => dispatch(saveClubContact(id, clubContact)),
    [dispatch]
  );

  const removeClubContact = useCallback((clubContact: ClubContact) => dispatch(removeClubContact(clubContact)), [dispatch]);

  const addClubContact = (contact: IContactData) => {
    if (contact) {
      dispatch(addNewClubContact(contact));
    } else {
      dispatch(appendNewClubContact());
    }
    setFindContact(false);
  };

  return (
    <div>
      <h3 className="text-primary">Club Contacts</h3>
      <LoadingContainer hasData={state.selectedClub?.clubContacts !== undefined}>
        {permissions.canEditClubPage() && canAdd && (
          <Button variant="link" className="text-warning" onClick={() => setFindContact(true)}>
            Add New Contact
          </Button>
        )}
        {findContact && <ContactSearch allowNew={true} OnSelect={addClubContact} />}
        {state.selectedClub?.clubContacts.map((cc: ClubContact) => {
          return (
            <ClubContactDetail
              key={cc.id}
              clubContact={cc}
              edit={cc.id === 0}
              Cancel={() => dispatch(cancelNewClubContact())}
              Delete={removeClubContact}
              Save={saveClubContact}
            />
          );
        })}
      </LoadingContainer>
    </div>
  );
};

export default ClubContactList;
