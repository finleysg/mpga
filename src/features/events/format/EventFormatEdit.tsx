import { Formik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';

import { EventDetail } from '../../../models/Events';

interface IEventDetailProps {
    eventDetail: EventDetail;
    Save: (eventDetail: EventDetail) => void;
}

const schema = yup.object({
    description: yup.string().required(),
});

const EventFormatEdit: React.FunctionComponent<IEventDetailProps> = (props) => {
    const { eventDetail } = props;
    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(false);
                    const newModel = Object.assign({}, eventDetail);
                    newModel.description = values.description;
                    props.Save(newModel);
                }}
                initialValues={eventDetail}
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
                        <Form.Group controlId="description">
                            <Form.Label>Event format</Form.Label>
                            <Form.Control as="textarea" rows="16" name="description"
                                placeholder="Event format description"
                                value={values.description}
                                isValid={touched.description && !errors.description}
                                isInvalid={!!errors.description}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Markdown supported.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" size="sm" disabled={isSubmitting}>
                            Save
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EventFormatEdit;
