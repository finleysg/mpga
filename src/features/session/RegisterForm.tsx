import { Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import * as yup from "yup";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../store";
import { Contact, IClub } from "../../models/Clubs";
import { IRegisterData } from "../../store/UserActions";

export interface IRegisterFormProps {
    clubs: IClub[];
    contact?: Contact;
    OnRegister: (registration: IRegisterData) => void;
}

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    homeClub: yup.number().required(),
    notes: yup.string().nullable(),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
});

const RegisterForm: React.FC<IRegisterFormProps> = (props) => {
    const session = useSelector((state: IApplicationState) => state.session);
    const { contact, clubs } = props;
    const account = {
        firstName: contact?.firstName || "",
        lastName: contact?.lastName || "",
        email: contact?.email || "",
        notes: contact?.notes || "",
    } as IRegisterData;

    return (
        <Formik
            validationSchema={schema}
            onSubmit={(values) => {
                props.OnRegister(values);
            }}
            initialValues={account}>
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isValid }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="firstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            placeholder="First name"
                            name="firstName"
                            value={values.firstName}
                            isValid={touched.firstName && !errors.firstName}
                            isInvalid={!!errors.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            placeholder="Last name"
                            name="lastName"
                            value={values.lastName}
                            isValid={touched.lastName && !errors.lastName}
                            isInvalid={!!errors.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            isValid={touched.email && !errors.email}
                            isInvalid={!!errors.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="ec.homeClub">
                        <Form.Label>MPGA member club</Form.Label>
                        <Form.Control
                            as="select"
                            name="homeClub"
                            value={values.homeClub?.toString()}
                            isValid={touched.homeClub && !errors.homeClub}
                            isInvalid={!!errors.homeClub}
                            onChange={handleChange}
                            onBlur={handleBlur}>
                            <option value={undefined}>--Select a Home Club--</option>
                            <option value={0}>Not in the List</option>
                            {clubs.map((c) => {
                                return (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                );
                            })}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.homeClub}</Form.Control.Feedback>
                    </Form.Group>
                    {values.homeClub === 0 && (
                        <Form.Group controlId="notes">
                            <Form.Control
                                as="textarea"
                                rows="2"
                                name="notes"
                                value={values.notes}
                                isValid={touched.notes && !errors.notes}
                                isInvalid={!!errors.notes}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.notes}</Form.Control.Feedback>
                            <Form.Text className="text-muted">Where do you play your golf?</Form.Text>
                        </Form.Group>
                    )}
                    <Form.Group controlId="password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
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
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            name="confirmPassword"
                            type="password"
                            value={values.confirmPassword}
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
                        disabled={session.isBusy || !isValid}>
                        Register
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;
