import { Formik } from 'formik';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';

import Confirm from '../../components/Confirm';
import { TournamentWinner } from '../../models/Events';

export interface ITournamentWinnerEditProps {
    winner: TournamentWinner,
    Save: (winner: TournamentWinner) => void,
    Cancel: () => void,
    Delete: (winner: TournamentWinner) => void,
};

const schema = yup.object({
    winner: yup.string().max(100).required(),
    winnerClub: yup.string().max(100).required(),
    coWinner: yup.string().max(100),
    coWinnerClub: yup.string().max(100),
    flightOrDivision: yup.string().max(20),
    score: yup.string().max(20),
    isNet: yup.bool(),
    isMatch: yup.bool(),
    notes: yup.string(),
});

const TournamentWinnerEdit: React.FC<ITournamentWinnerEditProps> = (props) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { winner } = props;

    const handleConfirmDeleteCancel = () => {
        setShowConfirmation(false);
    }

    const handleConfirmDeleteContinue = () => {
        setShowConfirmation(false);
        props.Delete(winner);
    }

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    const updated = {
                        year: winner.year,
                        location: winner.location,
                        isMatch: winner.isMatch,
                        ...values,
                    }
                    const newModel = new TournamentWinner(updated);
                    newModel.id = winner.id;
                    props.Save(newModel);
                    actions.setSubmitting(false);
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
                            <Form.Group controlId="winner.flightOrDivision">
                                <Form.Label>Flight/Division</Form.Label>
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
                            <Form.Group controlId="winner.winnerClub">
                                <Form.Label>Winner Club</Form.Label>
                                <Form.Control name="winnerClub"
                                    placeholder="Winner's Club"
                                    value={values.winnerClub}
                                    isValid={touched.winnerClub && !errors.winnerClub}
                                    isInvalid={!!errors.winnerClub}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.winnerClub}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="winner.coWinner">
                                <Form.Label>Co-Winner (team events)</Form.Label>
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
                            <Form.Group controlId="winner.coWinnerClub">
                                <Form.Label>Co-Winner Club</Form.Label>
                                <Form.Control name="coWinnerClub"
                                    placeholder="Co-Winner's Club"
                                    value={values.coWinnerClub}
                                    isValid={touched.coWinnerClub && !errors.coWinnerClub}
                                    isInvalid={!!errors.coWinnerClub}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.coWinnerClub}
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
                            <Form.Group controlId="winner.isNet">
                                <Form.Check
                                    type="switch"
                                    name="isNet"
                                    value={values.isNet.toString()}
                                    label="This is a net score"
                                    onChange={handleChange}
                                />
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
                            {winner.id! > 0 &&
                                <Button className="ml-1" variant="outline-danger" size="sm" onClick={() => setShowConfirmation(true)}>Delete</Button>
                            }
                            {winner.id! <= 0 &&
                                <Button className="ml-1" variant="light" size="sm" onClick={props.Cancel}>Cancel</Button>
                            }
                        </Form>
                    )}
            </Formik>
            <Confirm
                show={showConfirmation}
                titleText="Delete Champion?"
                messageText="Please confirm that we should delete this champion."
                confirmText="Delete Champion"
                DoCancel={handleConfirmDeleteCancel}
                DoConfirm={handleConfirmDeleteContinue}
            />
        </div>
    );
}

export default TournamentWinnerEdit;
