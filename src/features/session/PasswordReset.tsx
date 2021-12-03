import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '../../components/Loading';
import { PasswordResetRequest } from '../../models/User';
import { IApplicationState } from '../../store';
import UserActions from '../../store/UserActions';
import PasswordResetForm, { IPasswordReset } from './PasswordResetForm';

const PasswordReset: React.FC = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const session = useSelector((state: IApplicationState) => state.session);

    const resetPassword = (credentials: IPasswordReset) => {
        const confirm = new PasswordResetRequest(
            uid || "",
            token || "",
            credentials.password,
            credentials.confirmPassword
        );
        dispatch(UserActions.ConfirmReset(confirm));
    };

    return (
        <div>
            {session.flags.isBusy && <Loading />}
            <Card>
                <Card.Header>
                    <Card.Title>Create or Reset Your Password</Card.Title>
                </Card.Header>
                <Card.Body>
                    {!session.flags.passwordResetConfirmed && (
                        <p>Enter and confirm your new password.</p>
                    )}
                    {session.flags.passwordResetConfirmed && (
                        <p className="text-success">
                            Your password has been changed. Log in now with your new password.
                        </p>
                    )}
                    <PasswordResetForm OnReset={(creds) => resetPassword(creds)} />
                    {session.flags.hasError && (
                        <p className="text-danger mt-3">{session.flags.errorMessage}</p>
                    )}
                </Card.Body>
                {session.flags.passwordResetConfirmed && (
                    <Card.Footer>
                        <Button
                            variant="outline-secondary"
                            onClick={() => navigate("/account/login")}>
                            Login
                        </Button>
                    </Card.Footer>
                )}
            </Card>
        </div>
    );
};

export default PasswordReset;
