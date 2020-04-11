import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import { Contact } from "../../models/Clubs";
import { IApplicationState } from "../../store";
import MemberClubActions from "../../store/MemberClubActions";
import UserActions, { IRegisterData } from "../../store/UserActions";
import { IContactData } from "../contacts/ContactApi";
import ContactSearch from "../contacts/ContactSearch";
import RegisterForm from "./RegisterForm";
import useNavigation from "../../routes/Navigation";

const Register: React.FC = () => {
    const navigator = useNavigation();
    const dispatch = useDispatch();
    const [selectedContact, setSelectedContact] = useState<Contact | undefined>(undefined);
    const session = useSelector((state: IApplicationState) => state.session);
    const memberState = useSelector((state: IApplicationState) => state.memberClubs);

    useEffect(() => {
        if (!memberState.clubs || memberState.clubs.length === 0) {
            dispatch(MemberClubActions.LoadMemberClubs());
        }
    }, [dispatch, memberState.clubs]);

    const register = (registrationData: IRegisterData) => {
        dispatch(UserActions.CreateAccount(registrationData, selectedContact));
    };

    const selectContact = (contact: IContactData) => {
        setSelectedContact(new Contact(contact));
    };

    return (
        <div>
            {session.isBusy && <Loading />}
            <Card>
                <Card.Header>
                    <Card.Title>Sign Up for an Account</Card.Title>
                </Card.Header>
                <Card.Body>
                    {!selectedContact && <ContactSearch allowNew={true} OnSelect={selectContact} />}
                    {selectedContact && (
                        <RegisterForm
                            contact={selectedContact}
                            clubs={memberState.clubs}
                            OnRegister={(registration) => register(registration)}
                        />
                    )}
                    {session.hasAccountError && <p className="text-danger mt-3">{session.errorMessage}</p>}
                    {session.accountExists && (
                        <p className="text-info mt-3">
                            This could be because you are an officer or contact for one of our member clubs. You can
                            create a password for your account by clicking the Reset Password button below.
                        </p>
                    )}
                </Card.Body>
                <Card.Footer>
                    <Button variant="outline-primary" onClick={() => navigator.navigate("/account/login")}>
                        Login
                    </Button>
                    {session.accountExists && (
                        <Button
                            variant="outline-primary"
                            className="ml-2"
                            onClick={() => navigator.navigate("/account/forgot")}>
                            Reset Password
                        </Button>
                    )}
                </Card.Footer>
            </Card>
        </div>
    );
};

export default Register;
