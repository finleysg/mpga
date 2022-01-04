import React from "react";

import { useAppDispatch, useAppSelector } from "app-store";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";
import useSession from "utilities/SessionHooks";

import Loading from "../../components/Loading";
import UserActions from "../../store/UserActions";
import LoginForm, { ICredentials } from "./LoginForm";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const app = useAppSelector((state) => state.app);
  const session = useAppSelector((state) => state.session);
  const { user } = useSession();

  const init: ICredentials = {
    email: "",
    password: "",
    remember: true,
  };

  if (user.isAuthenticated) {
    navigate(app.location || "/account");
  }

  const login = (credentials: ICredentials) => {
    dispatch(UserActions.Login(credentials.email, credentials.password, credentials.remember));
  };

  return (
    <div>
      {session.flags.isBusy && <Loading />}
      <Card>
        <Card.Header>
          <Card.Title>Log in to MPGA.net</Card.Title>
        </Card.Header>
        <Card.Body>
          <LoginForm credentials={init} OnLogin={(creds) => login(creds)} />
          {session.flags.hasError && <p className="text-danger">{session.flags.errorMessage}</p>}
        </Card.Body>
        <Card.Footer>
          <Button variant="outline-secondary" onClick={() => navigate("/account/forgot")}>
            Forgot Password
          </Button>
          <Button variant="outline-secondary" className="ml-2" onClick={() => navigate("/account/register")}>
            Register
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Login;
