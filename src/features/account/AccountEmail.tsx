import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";

import { IApplicationState } from "../../store";
import UserActions from "../../store/UserActions";
import ChangeEmailForm from "./ChangeEmailForm";
import { EditAccountContainer } from "./AccountPassword";

const AccountEmail: React.FC = () => {
    const [doEdit, setDoEdit] = useState(false);
    const dispatch = useDispatch();
    const session = useSelector((state: IApplicationState) => state.session);

    const changeEmail = (email: string) => {
        dispatch(UserActions.UpdateAccount({ email: email }));
        setDoEdit(false);
    };

    return (
        <div>
            <Row>
                <Col xs={3}>Email</Col>
                <Col xs={8}>{session.user.email}</Col>
                <Col xs={1}>
                    <Button variant="link" className="text-info" onClick={() => setDoEdit(!doEdit)}>
                        {doEdit ? "cancel" : "change"}
                    </Button>
                </Col>
            </Row>
            {doEdit && (
                <Row>
                    <Col xs={12}>
                        <EditAccountContainer>
                            <ChangeEmailForm email={session.user.email} OnChange={(email) => changeEmail(email)} />
                        </EditAccountContainer>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default AccountEmail;
