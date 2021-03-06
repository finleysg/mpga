import { Formik } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import SubmitButton from "../../components/SubmitButton";
import { TournamentWinner } from "../../models/Events";
import { Editor } from "@toast-ui/react-editor";

export interface ITournamentWinnerEditProps {
    winner: TournamentWinner;
    Save: (winner: TournamentWinner) => void;
    Cancel: () => void;
}

const schema = yup.object({
    year: yup.number().required(),
    location: yup.string().max(100).required(),
    winner: yup.string().max(100).required(),
    winnerClub: yup.string().max(100).required(),
    coWinner: yup.string().max(100).nullable(),
    coWinnerClub: yup.string().max(100).nullable(),
    flightOrDivision: yup.string().max(20).required(),
    score: yup.string().max(20),
    isNet: yup.bool(),
    isMatch: yup.bool(),
    notes: yup.string().nullable(),
});

const TournamentWinnerEdit: React.FC<ITournamentWinnerEditProps> = (props) => {
    const { winner } = props;
    const editorRef = React.createRef<Editor>();

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    const newModel = new TournamentWinner(values);
                    newModel.id = winner.id;
                    newModel.notes = editorRef.current?.getInstance().getMarkdown();
                    props.Save(newModel);
                }}
                initialValues={winner}>
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="winner.year">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                name="year"
                                value={values.year.toString()}
                                isValid={touched.year && !errors.year}
                                isInvalid={!!errors.year}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="winner.location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                name="location"
                                placeholder="Location"
                                value={values.location}
                                isValid={touched.location && !errors.location}
                                isInvalid={!!errors.location}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="winner.flightOrDivision">
                            <Form.Label>Flight/Division</Form.Label>
                            <Form.Control
                                name="flightOrDivision"
                                placeholder="Flight/Division"
                                value={values.flightOrDivision}
                                isValid={touched.flightOrDivision && !errors.flightOrDivision}
                                isInvalid={!!errors.flightOrDivision}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.flightOrDivision}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="winner.winner">
                            <Form.Label>Winner</Form.Label>
                            <Form.Control
                                name="winner"
                                placeholder="Winner"
                                value={values.winner}
                                isValid={touched.winner && !errors.winner}
                                isInvalid={!!errors.winner}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.winner}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="winner.winnerClub">
                            <Form.Label>Winner Club</Form.Label>
                            <Form.Control
                                name="winnerClub"
                                placeholder="Winner's Club"
                                value={values.winnerClub}
                                isValid={touched.winnerClub && !errors.winnerClub}
                                isInvalid={!!errors.winnerClub}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.winnerClub}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="winner.coWinner">
                            <Form.Label>Co-Winner (team events)</Form.Label>
                            <Form.Control
                                name="coWinner"
                                placeholder="Co-Winner"
                                value={values.coWinner}
                                isValid={touched.coWinner && !errors.coWinner}
                                isInvalid={!!errors.coWinner}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.coWinner}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="winner.coWinnerClub">
                            <Form.Label>Co-Winner Club</Form.Label>
                            <Form.Control
                                name="coWinnerClub"
                                placeholder="Co-Winner's Club"
                                value={values.coWinnerClub}
                                isValid={touched.coWinnerClub && !errors.coWinnerClub}
                                isInvalid={!!errors.coWinnerClub}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.coWinnerClub}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="winner.score">
                            <Form.Label>Score</Form.Label>
                            <Form.Control
                                name="score"
                                placeholder="Score"
                                value={values.score}
                                isValid={touched.score && !errors.score}
                                isInvalid={!!errors.score}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.score}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="winner.isNet">
                            <Form.Check
                                type="switch"
                                name="isNet"
                                value={values.isNet.toString()}
                                checked={values.isNet}
                                label="This is a net score"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="winner.isMatch">
                            <Form.Check
                                type="switch"
                                name="isMatch"
                                value={values.isMatch.toString()}
                                checked={values.isMatch}
                                label="Match play"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="winner.notes">
                            <Form.Label>Notes</Form.Label>
                            <Editor
                                initialValue={values.notes}
                                previewStyle="tab"
                                height="240px"
                                initialEditType="wysiwyg"
                                useCommandShortcut={true}
                                useDefaultHTMLSanitizer={true}
                                hideModeSwitch={true}
                                ref={editorRef}
                            />
                        </Form.Group>
                        <SubmitButton />
                        {/* {winner.id! <= 0 && (
                            <Button className="ml-1" variant="light" size="sm" onClick={props.Cancel}>
                                Cancel
                            </Button>
                        )} */}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default TournamentWinnerEdit;
