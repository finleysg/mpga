import { Formik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';

import { TournamentWinner } from '../../models/Events';
import { ITournamentWinnerEditProps } from '../tournaments/TournamentWinnerEdit';

const schema = yup.object({
    year: yup.number().required(),
    location: yup.string().max(100).required(),
    winner: yup.string().max(100).required(),
    coWinner: yup.string().max(100),
    flightOrDivision: yup.string().max(20),
    score: yup.string().max(20),
    notes: yup.string().nullable(),
});

const MatchPlayHistoryEdit: React.FC<ITournamentWinnerEditProps> = (props) => {
    const { winner } = props;

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true);
                    const updated = {
                        winnerClub: "",
                        coWinnerClub: "",
                        ...values,
                    }
                    const newModel = new TournamentWinner(updated);
                    newModel.id = winner.id;
                    newModel.isMatch = true;
                    props.Save(newModel);
                }}
                initialValues={winner}
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
                            <Form.Group controlId="winner.year">
                                <Form.Label>Year</Form.Label>
                                <Form.Control name="year"
                                    value={values.year.toString()}
                                    isValid={touched.year && !errors.year}
                                    isInvalid={!!errors.year}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.year}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="winner.location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control name="location"
                                    placeholder="Location"
                                    value={values.location}
                                    isValid={touched.location && !errors.location}
                                    isInvalid={!!errors.location}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.location}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="winner.flightOrDivision">
                                <Form.Label>Group</Form.Label>
                                <Form.Control name="flightOrDivision"
                                    placeholder="Flight/Division"
                                    value={values.flightOrDivision}
                                    isValid={touched.flightOrDivision && !errors.flightOrDivision}
                                    isInvalid={!!errors.flightOrDivision}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.flightOrDivision}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="winner.winner">
                                <Form.Label>Winner</Form.Label>
                                <Form.Control name="winner"
                                    placeholder="Winner"
                                    value={values.winner}
                                    isValid={touched.winner && !errors.winner}
                                    isInvalid={!!errors.winner}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.winner}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="winner.coWinner">
                                <Form.Label>Runner Up</Form.Label>
                                <Form.Control name="coWinner"
                                    placeholder="Co-Winner"
                                    value={values.coWinner}
                                    isValid={touched.coWinner && !errors.coWinner}
                                    isInvalid={!!errors.coWinner}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.coWinner}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="winner.score">
                                <Form.Label>Score</Form.Label>
                                <Form.Control name="score"
                                    placeholder="Score"
                                    value={values.score}
                                    isValid={touched.score && !errors.score}
                                    isInvalid={!!errors.score}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.score}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="winner.notes">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control as="textarea" rows="3" name="notes"
                                    placeholder="Notes"
                                    value={values.notes}
                                    isValid={touched.notes && !errors.notes}
                                    isInvalid={!!errors.notes}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.notes}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit" size="sm" disabled={isSubmitting}>Save</Button>
                            {/* {winner.id! <= 0 &&
                                <Button className="ml-1" variant="light" size="sm" onClick={props.Cancel}>Cancel</Button>
                            } */}
                        </Form>
                    )}
            </Formik>
        </div>
    );
}

export default MatchPlayHistoryEdit;