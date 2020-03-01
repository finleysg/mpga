import { Formik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import * as yup from 'yup';

import Loading from '../../components/Loading';
import { IApplicationState } from '../../store';
import UserActions from '../../store/UserActions';

interface ILogin {
    email: string,
    password: string,
    remember: boolean,
};

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    remember: yup.boolean(),
});

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const session = useSelector((state: IApplicationState) => state.session);
    const init: ILogin = {
        email: "",
        password: "",
        remember: true,
    };

    const history = useHistory();
    const location = useLocation();
    const { from } = { from: { pathname: location.pathname || "/" } };
    const login = (email: string, password: string, remember: boolean) => {
        dispatch(UserActions.Login(email, password, remember, history, from));
    };

    return (
        <div>
            {session.isBusy && <Loading />}
            <Card>
                <Card.Header>
                    <Card.Title>Log in to MPGA.net</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={(values, actions) => {
                            login(values.email, values.password, values.remember);
                            actions.setSubmitting(false);
                        }}
                        initialValues={init}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            errors,
                            isSubmitting,
                        }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="login.email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control placeholder="email" name="email"
                                            type="email"
                                            value={values.email}
                                            isValid={touched.email && !errors.email}
                                            isInvalid={!!errors.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="login.password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control placeholder="password" name="password"
                                            type="password"
                                            value={values.password}
                                            isValid={touched.password && !errors.password}
                                            isInvalid={!!errors.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="loginremember">
                                        <Form.Check type="switch" 
                                            defaultChecked={values.remember}
                                            onChange={handleChange}
                                            label="Remember me on this device" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" size="sm" className="mt-2" disabled={isSubmitting}>
                                        Login
                                </Button>
                                </Form>
                            )}
                    </Formik>
                </Card.Body>
                {session.hasError && <Card.Footer className="text-danger">{session.errorMessage}</Card.Footer>}
            </Card>
        </div>
    );
}

export default Login;
