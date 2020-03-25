import { Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';

import Confirm from '../../../components/Confirm';
import { EventPoints } from '../../../models/Events';

export interface IEventPointsEditProps {
    points: EventPoints;
    Cancel: () => void;
    Save: (points: EventPoints) => void;
    Delete: (points: EventPoints) => void;
}

const schema = yup.object({
    place: yup
        .number()
        .required(),
    points: yup
        .number()
        .required(),
});

const EventPointsEdit: React.FC<IEventPointsEditProps> = props => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { points } = props;

    const handleConfirmDeleteCancel = () => {
        setShowConfirmation(false);
    };

    const handleConfirmDeleteContinue = () => {
        setShowConfirmation(false);
        props.Delete(props.points);
    };

    const saveEventPoints = (values: EventPoints, actions: FormikHelpers<EventPoints>) => {
        actions.setSubmitting(false);
        const newModel = new EventPoints();
        newModel.id = points.id;
        newModel.event = points.event;
        newModel.place = values.place;
        newModel.points = values.points;
        props.Save(newModel);
    };

    return (
        <div>
            <Formik validationSchema={schema} onSubmit={saveEventPoints} initialValues={points}>
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="points.place">
                            <Form.Label>Place</Form.Label>
                            <Form.Control
                                name="place"
                                value={values.place?.toString()}
                                isValid={touched.place && !errors.place}
                                isInvalid={!!errors.place}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.place}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="points.points">
                            <Form.Label>Points</Form.Label>
                            <Form.Control
                                name="points"
                                value={values.points?.toString()}
                                isValid={touched.points && !errors.points}
                                isInvalid={!!errors.points}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.points}</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" size="sm" disabled={isSubmitting}>
                            Save
                        </Button>
                        {points.id !== 0 && (
                            <Button
                                className="ml-1"
                                variant="outline-danger"
                                size="sm"
                                onClick={() => setShowConfirmation(true)}>
                                Delete
                            </Button>
                        )}
                        {points.id === 0 && (
                            <Button className="ml-1" variant="light" size="sm" onClick={props.Cancel}>
                                Cancel
                            </Button>
                        )}
                    </Form>
                )}
            </Formik>
            <Confirm
                show={showConfirmation}
                titleText="Delete Place/Points?"
                messageText="Please confirm that we should delete this place from the tournament."
                confirmText="Delete"
                DoCancel={handleConfirmDeleteCancel}
                DoConfirm={handleConfirmDeleteContinue}
            />
        </div>
    );
};

export default EventPointsEdit;
