import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import { IApplicationState } from "../../store";
import UserActions from "../../store/UserActions";
import LoginForm, { ICredentials } from "./LoginForm";
import useNavigation from "../../routes/Navigation";

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigator = useNavigation();
    const app = useSelector((state: IApplicationState) => state.app);
    const session = useSelector((state: IApplicationState) => state.session);
    const init: ICredentials = {
        email: "",
        password: "",
        remember: true,
    };
    
    // TODO: this is wrong and hurtful. Maybe look at a solution proposed here:
    // https://stackoverflow.com/questions/47937563/react-navigation-to-navigate-from-redux-action-file
    if (session.user.isAuthenticated) {
        navigator.navigate(app.location || "/account");
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
                    <Button variant="outline-primary" onClick={() => navigator.navigate("/account/forgot")}>
                        Forgot Password
                    </Button>
                    <Button variant="outline-primary" className="ml-2" onClick={() => navigator.navigate("/account/register")}>
                        Register
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default Login;
