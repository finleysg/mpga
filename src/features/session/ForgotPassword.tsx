import React from "react";

import { useAppDispatch, useAppSelector } from "app-store";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";

import Loading from "../../components/Loading";
import { IApplicationState } from "../../store";
import UserActions from "../../store/UserActions";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const session = useAppSelector((state: IApplicationState) => state.session);

  const requestReset = (email: string) => {
    dispatch(UserActions.ResetPassword(email));
  };

  return (
    <div>
      {session.flags.isBusy && <Loading />}
      <Card>
        <Card.Header>
          <Card.Title>Request a Password Reset</Card.Title>
        </Card.Header>
        <Card.Body>
          <ForgotPasswordForm
            email={session.accountRequest?.email || ""}
            OnRequestReset={(email) => requestReset(email)}
          />
          {session.flags.hasError && <p className="text-danger">{session.flags.errorMessage}</p>}
          {session.flags.pendingPasswordReset && (
            <p className="text-success mt-3">
              An email has been sent to the address you entered above. If you don't receive a reset link within a few
              minutes, check to ensure that your email client is not flagging email from mpga.net as junk or spam. If we
              don't have an account record with this email, that would be another reason you might not receive a reset
              link. In that case, please register to create an account.
            </p>
          )}
        </Card.Body>
        <Card.Footer>
          <Button variant="outline-secondary" onClick={() => navigate("/account/login")}>
            Login
          </Button>
          <Button variant="outline-secondary" className="ml-2" onClick={() => navigate("/account/register")}>
            Register
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ForgotPassword;
