import { Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { ContactMessage } from "../../models/ContactMessage";
import { IApplicationState } from "../../store";
import MessageActions from "../../store/MessageActions";
import styled from "styled-components";

const ContactFormContainer = styled.div`
    border: 1px solid silver;
    background-color: #eeeeee;
    border-radius: 4px;
    padding: 10px;
    margin: 20px 0;
`;
ContactFormContainer.displayName = "ContactFormContainer";

export interface IContactFormProps {
    message: ContactMessage;
}

const schema = yup.object({
    course: yup.string().required(),
    contactName: yup.string().required(),
    contactEmail: yup.string().email().required(),
    contactPhone: yup.string().nullable(),
    message: yup.string().required(),
});

const ContactForm: React.FC<IContactFormProps> = (props) => {
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.messaging);
    let message = props.message;

    return (
        <React.Fragment>
            <ContactFormContainer>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                        const message = Object.assign(new ContactMessage(), props.message, values);
                        dispatch(MessageActions.SendMessage(message));
                    }}
                    onReset={(values, actions) => {
                        actions.resetForm({ values: new ContactMessage() });
                    }}
                    initialValues={message}>
                    {({ handleSubmit, handleReset, handleChange, handleBlur, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit} onReset={handleReset}>
                            <Form.Group controlId="contactName">
                                <Form.Control
                                    placeholder="Name"
                                    name="contactName"
                                    value={values.contactName}
                                    isValid={touched.contactName && !errors.contactName}
                                    isInvalid={!!errors.contactName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">{errors.contactName}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="contactEmail">
                                <Form.Control
                                    placeholder="Email"
                                    name="contactEmail"
                                    value={values.contactEmail}
                                    isValid={touched.contactEmail && !errors.contactEmail}
                                    isInvalid={!!errors.contactEmail}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">{errors.contactEmail}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="contactPhone">
                                <Form.Control
                                    placeholder="Phone number"
                                    name="contactPhone"
                                    value={values.contactPhone}
                                    isValid={touched.contactPhone && !errors.contactPhone}
                                    isInvalid={!!errors.contactPhone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">{errors.contactPhone}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="course">
                                <Form.Control
                                    placeholder="Home course"
                                    name="course"
                                    value={values.course}
                                    isValid={touched.course && !errors.course}
                                    isInvalid={!!errors.course}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">{errors.course}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="announcement.Text">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Enter your message here"
                                    rows="6"
                                    name="message"
                                    value={values.message}
                                    isValid={touched.message && !errors.message}
                                    isInvalid={!!errors.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                size="sm"
                                disabled={state.sending || state.sent !== undefined}>
                                {state.sending && (
                                    <Spinner as="span" animation="border" variant="secondary" role="status">
                                        <span className="sr-only">Sending...</span>
                                    </Spinner>
                                )}
                                Send
                            </Button>
                            <Button className="ml-2" variant="light" type="reset" size="sm">
                                Reset
                            </Button>
                        </Form>
                    )}
                </Formik>
            </ContactFormContainer>
            {state.failed && (
                <p className="text-danger mt-2">
                    Something went wrong and your message was not sent. You can try again, or contact the MPGA directly
                    at info@mpga.net.
                </p>
            )}
            {state.sent !== undefined && <p className="text-success mt-2">Thank you for your message.</p>}
        </React.Fragment>
    );
};

export default ContactForm;
