import React, { useState } from "react";

import { OverlaySpinner } from "components/Spinner";
import Button from "react-bootstrap/Button";

import { Contact, ExecutiveCommittee } from "../../models/Clubs";
import usePermissions from "../../utilities/Permissions";
import ContactSearch from "../contacts/ContactSearch";
import { useGetCommitteeQuery } from "./committeeApi";
import CommitteeMemberDetail from "./CommitteeMemberDetail";

const CommitteeList: React.FC = () => {
  const [addNew, setAddNew] = useState(false);
  const [findContact, setFindContact] = useState(false);
  const [newContact, setNewContact] = useState(new Contact({ id: 0 }));
  const { data: committeeMembers, isLoading, isFetching } = useGetCommitteeQuery();
  const permissions = usePermissions();

  const addCommitteeMember = (contact: Contact) => {
    if (contact) {
      setNewContact(contact);
    } else {
      setNewContact(new Contact({ id: 0 }));
    }
    setFindContact(false);
    setAddNew(true);
  };

  return (
    <div>
      <OverlaySpinner loading={isLoading || isFetching} />
      <div>
        <h3 className="text-primary">Executive Committee Members</h3>
        {permissions.canAddCommittee() && !addNew && (
          <Button variant="link" className="text-warning" onClick={() => setFindContact(true)}>
            Add New
          </Button>
        )}
      </div>
      {findContact && <ContactSearch allowNew={true} OnSelect={addCommitteeMember} />}
      {addNew && (
        <CommitteeMemberDetail
          key={0}
          committeeMember={new ExecutiveCommittee({ id: 0, contact: newContact.prepJson() })}
          edit={true}
          onClose={() => setAddNew(false)}
        />
      )}
      {committeeMembers?.map((ec) => {
        return (
          <CommitteeMemberDetail
            key={ec.id}
            committeeMember={new ExecutiveCommittee(ec)}
            edit={false}
            onClose={() => setAddNew(false)}
          />
        );
      })}
    </div>
  );
};

export default CommitteeList;
