import { Formik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';

import { ITournamentHistoryOverviewProps } from './TournamentHistoryOverview';
import { Tournament } from '../../models/Events';

export interface ITournamentHistoryEditProps extends ITournamentHistoryOverviewProps {
    Save: (tournament: Tournament) => void,
};

const schema = yup.object({
    name: yup.string().max(120).required(),
    description: yup.string().required(),
});

const TournamentHistoryEdit: React.FC<ITournamentHistoryEditProps> = (props) => {
    const tournament = props.tournament;
    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    const newModel = new Tournament(values);
                    newModel.id = tournament.id;
                    props.Save(newModel);
                    actions.setSubmitting(false);
                }}
                initialValues={tournament}
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
                        <Form.Group controlId="tournament.Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name"
                                placeholder="Name"
                                value={values.name}
                                isValid={touched.name && !errors.name}
                                isInvalid={!!errors.name}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="tournament.Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="8" name="description"
                                placeholder="Tournament description"
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
}

export default TournamentHistoryEdit;
