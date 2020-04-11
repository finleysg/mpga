import { Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

import * as yup from "yup";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../store";

export interface ICredentials {
    email: string;
    password: string;
    remember: boolean;
}

export interface ILoginForm {
    credentials: ICredentials,
    OnLogin: (credentials: ICredentials) => void,
    // OnForgotPassword: () => void,
    // OnRegister: () => void,
}

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    remember: yup.boolean(),
});

const LoginForm: React.FC<ILoginForm> = (props) => {
    const { credentials } = props; 
    const session = useSelector((state: IApplicationState) => state.session);

    return (
        <Formik
            validationSchema={schema}
            onSubmit={(values) => {
                props.OnLogin(values);
            }}
            initialValues={credentials}>
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="login.email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            placeholder="email"
                            name="email"
                            type="email"
                            value={values.email}
                            isValid={touched.email && !errors.email}
                            isInvalid={!!errors.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="login.password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            placeholder="password"
                            name="password"
                            type="password"
                            value={values.password}
                            isValid={touched.password && !errors.password}
                            isInvalid={!!errors.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="loginremember">
                        <Form.Check
                            type="switch"
                            defaultChecked={values.remember}
                            onChange={handleChange}
                            label="Remember me on this device"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" size="sm" className="mt-2" disabled={session.flags.isBusy}>
                        Login
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
