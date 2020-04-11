import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";

import { IApplicationState } from "../../store";
import UserActions from "../../store/UserActions";
import ChangeNameForm from "./ChangeNameForm";
import { EditAccountContainer } from "./AccountPassword";

const AccountName: React.FC = () => {
    const [doEdit, setDoEdit] = useState(false);
    const dispatch = useDispatch();
    const session = useSelector((state: IApplicationState) => state.session);

    const changeName = (firstName: string, lastName: string) => {
        dispatch(UserActions.UpdateAccount({ first_name: firstName, last_name: lastName }));
        setDoEdit(false);
    };

    return (
        <div>
            <Row>
                <Col xs={3}>Name</Col>
                <Col xs={8}>{session.user.name}</Col>
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
                            <ChangeNameForm
                                firstName={session.user.firstName}
                                lastName={session.user.lastName}
                                OnChange={(first, last) => changeName(first, last)}
                            />
                        </EditAccountContainer>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default AccountName;
