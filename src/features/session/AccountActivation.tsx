import React, { useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loading from '../../components/Loading';
import useNavigation from '../../routes/Navigation';
import { IApplicationState } from '../../store';
import UserActions from '../../store/UserActions';

const AccountActivation: React.FC = () => {
    const { uid, token } = useParams<{ uid: string; token: string }>();
    const navigator = useNavigation();
    const dispatch = useDispatch();
    const session = useSelector((state: IApplicationState) => state.session);

    useEffect(() => {
        if (uid && token) {
            dispatch(UserActions.ActivateAccount(uid, token));
        }
    }, [dispatch, uid, token]);

    return (
        <div>
            {session.flags.isBusy && <Loading />}
            <Card>
                <Card.Header>
                    <Card.Title>Account Activation Status</Card.Title>
                </Card.Header>
                <Card.Body>
                    {session.flags.accountActivated && (
                        <p className="text-success mt-1">
                            Your account has been confirmed and activated. Log in now with your new
                            password. Thank you for supporting Minnesota Public Golf!
                        </p>
                    )}
                    {session.flags.hasError && (
                        <p className="text-danger mt-1">{session.flags.errorMessage}</p>
                    )}
                </Card.Body>
                {session.flags.accountActivated && (
                    <Card.Footer>
                        <Button
                            variant="outline-secondary"
                            onClick={() => navigator.navigate("/account/login")}>
                            Login
                        </Button>
                    </Card.Footer>
                )}
            </Card>
        </div>
    );
};

export default AccountActivation;
