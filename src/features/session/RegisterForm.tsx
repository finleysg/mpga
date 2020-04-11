import { Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import * as yup from "yup";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../store";
import { IRegisterData } from "../../store/UserActions";

export interface IRegisterFormProps {
    OnRegister: (registration: IRegisterData) => void;
}

const schema = yup.object({
    firstName: yup.string().required("Please enter a first name"),
    lastName: yup.string().required("Please enter a last name"),
    email: yup.string().email().required("A valid email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
});

const RegisterForm: React.FC<IRegisterFormProps> = (props) => {
    const session = useSelector((state: IApplicationState) => state.session);

    return (
        <Formik
            validationSchema={schema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values) => {
                props.OnRegister(values);
            }}
            initialValues={{} as IRegisterData}>
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        {/* <Form.Label>Email</Form.Label> */}
                        <Form.Control
                            placeholder="Email"
                            name="email"
                            type="email"
                            value={values.email || ""}
                            isValid={touched.email && !errors.email}
                            isInvalid={!!errors.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="firstName">
                        {/* <Form.Label>First Name</Form.Label> */}
                        <Form.Control
                            placeholder="First Name"
                            name="firstName"
                            value={values.firstName || ""}
                            isValid={touched.firstName && !errors.firstName}
                            isInvalid={!!errors.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        {/* <Form.Label>Last Name</Form.Label> */}
                        <Form.Control
                            placeholder="Last Name"
                            name="lastName"
                            value={values.lastName || ""}
                            isValid={touched.lastName && !errors.lastName}
                            isInvalid={!!errors.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="password">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={values.password || ""}
                            isValid={touched.password && !errors.password}
                            isInvalid={!!errors.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        {/* <Form.Label>Confirm Password</Form.Label> */}
                        <Form.Control
                            placeholder="Confirm your password"
                            name="confirmPassword"
                            type="password"
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
                        disabled={session.flags.isBusy}>
                        Register
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;
