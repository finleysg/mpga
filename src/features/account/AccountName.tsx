import React, { useState } from "react";

import { useAppDispatch } from "app-store";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useSession from "utilities/SessionHooks";

import UserActions from "../../store/UserActions";
import { EditAccountContainer } from "./AccountPassword";
import ChangeNameForm from "./ChangeNameForm";

const AccountName: React.FC = () => {
  const [doEdit, setDoEdit] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useSession();

  const changeName = (firstName: string, lastName: string) => {
    dispatch(UserActions.UpdateAccount({ first_name: firstName, last_name: lastName }));
    setDoEdit(false);
  };

  return (
    <div>
      <Row>
        <Col xs={3}>Name</Col>
        <Col xs={8}>{user.name}</Col>
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
                firstName={user.firstName}
                lastName={user.lastName}
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
