import { Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import * as yup from "yup";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../store";

export interface IPasswordReset {
    password: string;
    confirmPassword: string;
}

export interface IPasswordResetFormProps {
    OnReset: (credentials: IPasswordReset) => void;
}

const schema = yup.object({
    password: yup.string().required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
});

const PasswordResetForm: React.FC<IPasswordResetFormProps> = (props) => {
    const session = useSelector((state: IApplicationState) => state.session);

    return (
        <Formik
            validationSchema={schema}
            onSubmit={(values) => {
                props.OnReset(values);
            }}
            initialValues={{} as IPasswordReset}>
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isValid }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            readOnly={session.passwordResetConfirmed}
                            value={values.password || ""}
                            isValid={touched.password && !errors.password}
                            isInvalid={!!errors.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            name="confirmPassword"
                            type="password"
                            readOnly={session.passwordResetConfirmed}
                            value={values.confirmPassword || ""}
                            isValid={touched.confirmPassword && !errors.confirmPassword}
                            isInvalid={!!errors.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        size="sm"
                        className="mt-2"
                        disabled={session.isBusy || !isValid || session.passwordResetConfirmed}>
                        Change Password
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default PasswordResetForm;
