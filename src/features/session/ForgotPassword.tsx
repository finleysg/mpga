import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import { IApplicationState } from "../../store";
import UserActions from "../../store/UserActions";
import ForgotPasswordForm from "./ForgotPasswordForm";
import useNavigation from "../../routes/Navigation";

const ForgotPassword: React.FC = () => {
    const navigator = useNavigation();
    const dispatch = useDispatch();
    const session = useSelector((state: IApplicationState) => state.session);

    const requestReset = (email: string) => {
        dispatch(UserActions.ResetPassword(email));
    };

    return (
        <div>
            {session.isBusy && <Loading />}
            <Card>
                <Card.Header>
                    <Card.Title>Request a Password Reset</Card.Title>
                </Card.Header>
                <Card.Body>
                    <ForgotPasswordForm
                        email={session.accountRequest?.email || ""}
                        OnRequestReset={(email) => requestReset(email)}
                    />
                    {session.hasError && <p className="text-danger">{session.errorMessage}</p>}
                    {session.pendingPasswordReset && (
                        <p className="text-success mt-3">
                            An email has been sent to the address you entered above. If you don't receive a reset link
                            within a few minutes, check to ensure that your email client is not flagging email from
                            mpga.net as junk or spam. If we don't have an account record with this email, that would be
                            another reason you might not receive a reset link. In that case, please register to create
                            an account.
                        </p>
                    )}
                </Card.Body>
                <Card.Footer>
                    <Button variant="outline-primary" onClick={() => navigator.navigate("/account/login")}>
                        Login
                    </Button>
                    <Button
                        variant="outline-primary"
                        className="ml-2"
                        onClick={() => navigator.navigate("/account/register")}>
                        Register
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default ForgotPassword;
