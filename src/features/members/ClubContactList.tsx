import React, { useState } from "react";

import Button from "react-bootstrap/Button";

import LoadingContainer from "../../components/LoadingContainer";
import { ClubContact, Contact } from "../../models/Clubs";
import usePermissions from "../../utilities/Permissions";
import ContactSearch from "../contacts/ContactSearch";
import ClubContactDetail from "./ClubContactDetail";
import { ClubProps } from "./MemberPropTypes";

const ClubContactList: React.FC<ClubProps> = (props) => {
  const { club } = props;

  const permissions = usePermissions();
  const [newContact, setNewContact] = useState(new ClubContact({ id: 0, club: club.id }));
  const [findContact, setFindContact] = useState(false);
  const [addNew, setAddNew] = React.useState(false);

  const canAdd = club.clubContacts.findIndex((cc) => cc.id === 0) < 0;

  const addContact = (contact: Contact) => {
    if (contact) {
      newContact.contact = contact;
      setNewContact(newContact);
    } else {
      setNewContact(new ClubContact({ id: 0, club: club.id }));
    }
    setFindContact(false);
    setAddNew(true);
  };

  return (
    <div>
      <h3 className="text-primary">Club Contacts</h3>
      <LoadingContainer hasData={true}>
        {permissions.canEditClubPage() && canAdd && (
          <Button variant="link" className="text-warning" onClick={() => setFindContact(true)}>
            Add New Contact
          </Button>
        )}
        {findContact && <ContactSearch allowNew={true} OnSelect={addContact} />}
        {addNew && (
          <ClubContactDetail
            key={0}
            clubId={club.id}
            clubContact={newContact}
            edit={true}
            onClose={() => setAddNew(false)}
          />
        )}
        {club.clubContacts.map((cc: ClubContact) => {
          return (
            <ClubContactDetail
              key={cc.id}
              clubId={club.id}
              clubContact={cc}
              edit={false}
              onClose={() => setAddNew(false)}
            />
          );
        })}
      </LoadingContainer>
    </div>
  );
};

export default ClubContactList;
