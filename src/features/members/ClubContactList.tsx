import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import { ClubContact } from "../../models/Clubs";
import { IApplicationState } from "../../store";
import MemberClubActions from "../../store/MemberClubActions";
import usePermissions from "../../utilities/Permissions";
import { IContactData } from "../contacts/ContactApi";
import ContactSearch from "../contacts/ContactSearch";
import ClubContactDetail from "./ClubContactDetail";
import { IClubContactData } from "./ClubContactEdit";

const ClubContactList: React.FC = () => {
    const dispatch = useDispatch();
    const permissions = usePermissions();
    const [findContact, setFindContact] = useState(false);
    const state = useSelector((state: IApplicationState) => state.memberClubs);
    const canAdd = state.selectedClub?.clubContacts.findIndex((cc) => cc.id === 0) < 0; // no pending add

    // Info on why we memoize the callback passed to a child component
    // https://react-redux.js.org/next/api/hooks#usedispatch
    const saveClubContact = useCallback(
        (id: number, clubContact: IClubContactData) => dispatch(MemberClubActions.SaveClubContact(id, clubContact)),
        [dispatch]
    );

    const removeClubContact = useCallback(
        (clubContact: ClubContact) => dispatch(MemberClubActions.RemoveClubContact(clubContact)),
        [dispatch]
    );

    const addClubContact = (contact: IContactData) => {
        if (contact) {
            dispatch(MemberClubActions.AddNewClubContact(contact));
        } else {
            dispatch(MemberClubActions.AppendNewClubContact());
        }
        setFindContact(false);
    };

    return (
        <div>
            <h3 className="text-primary">Club Contacts</h3>
            {permissions.canEditClubPage() && canAdd && (
                <Button variant="link" className="text-warning" onClick={() => setFindContact(true)}>
                    Add New Contact
                </Button>
            )}
            {findContact && <ContactSearch allowNew={true} OnSelect={addClubContact} />}
            {state.isBusy ? (
                <Loading />
            ) : (
                state.selectedClub?.clubContacts.map((cc: ClubContact) => {
                    return (
                        <ClubContactDetail
                            key={cc.id}
                            clubContact={cc}
                            edit={cc.id === 0}
                            Cancel={() => dispatch(MemberClubActions.CancelNewClubContact())}
                            Delete={removeClubContact}
                            Save={saveClubContact}
                        />
                    );
                })
            )}
        </div>
    );
};

export default ClubContactList;
