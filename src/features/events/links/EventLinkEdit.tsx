import { Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import Confirm from "../../../components/Confirm";
import { EventLink } from "../../../models/Events";

export interface IEventLinkEditProps {
    eventLink: EventLink;
    Cancel: () => void;
    Delete: (eventLink: EventLink) => void;
    Save: (eventLink: EventLink) => void;
}

const schema = yup.object({
    title: yup.string().max(60).required(),
    linkType: yup.string().required(),
    url: yup.string().max(240).url().required(),
});

const EventLinkEdit: React.FC<IEventLinkEditProps> = (props) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const eventLink = props.eventLink;

    const handleConfirmDeleteCancel = () => {
        setShowConfirmation(false);
    };

    const handleConfirmDeleteContinue = () => {
        setShowConfirmation(false);
        props.Delete(eventLink);
    };

    const saveEventLink = (values: EventLink, actions: FormikHelpers<EventLink>) => {
        actions.setSubmitting(false);
        const newModel = new EventLink({
            id: props.eventLink.id,
            event: props.eventLink.event,
            link_type: values.linkType,
            title: values.title,
            url: values.url,
        });
        props.Save(newModel);
    };

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, actions) => saveEventLink(values, actions)}
                initialValues={eventLink}>
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="eventLink.title">
                            <Form.Label className="full-width">Title</Form.Label>
                            <Form.Control
                                placeholder="Title"
                                name="title"
                                value={values.title}
                                isValid={touched.title && !errors.title}
                                isInvalid={!!errors.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                            <Form.Text className="text-muted">Display name for this link.</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="doc.LinkType">
                            <Form.Label>Link type</Form.Label>
                            <Form.Control
                                as="select"
                                name="linkType"
                                value={values.linkType}
                                isValid={touched.linkType && !errors.linkType}
                                isInvalid={!!errors.linkType}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option value=""></option>
                                <option value="Media">Media</option>
                                <option value="Registration">Registration</option>
                                <option value="Results">Results</option>
                                <option value="Tee Times">Tee Times</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="eventLink.url">
                            <Form.Label className="full-width">Url</Form.Label>
                            <Form.Control
                                placeholder="https://link-to-somewhere"
                                name="url"
                                value={values.url}
                                isValid={touched.url && !errors.url}
                                isInvalid={!!errors.url}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.url}</Form.Control.Feedback>
                            <Form.Text className="text-muted">Url for the link</Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" size="sm" disabled={isSubmitting}>
                            Save
                        </Button>
                        {eventLink.id !== 0 && (
                            <Button
                                className="ml-1"
                                variant="outline-danger"
                                size="sm"
                                onClick={() => setShowConfirmation(true)}>
                                Delete
                            </Button>
                        )}
                        {eventLink.id === 0 && (
                            <Button className="ml-1" variant="light" size="sm" onClick={props.Cancel}>
                                Cancel
                            </Button>
                        )}
                    </Form>
                )}
            </Formik>
            <Confirm
                show={showConfirmation}
                titleText="Delete Link?"
                messageText="Please confirm that we should delete this link."
                confirmText="Delete Link"
                DoCancel={handleConfirmDeleteCancel}
                DoConfirm={handleConfirmDeleteContinue}
            />
        </div>
    );
};

export default EventLinkEdit;
