import { Formik } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import { Editor } from "@toast-ui/react-editor";

import CancelButton from "../../components/CancelButton";
import SubmitButton from "../../components/SubmitButton";
import { AwardWinner } from "../../models/Events";

export interface IAwardWinnerEditProps {
    winner: AwardWinner;
    Save: (winner: AwardWinner) => void;
    Cancel: () => void;
}

const schema = yup.object({
    year: yup.number().required(),
    winner: yup.string().max(100).required(),
    notes: yup.string(),
});

const AwardWinnerEdit: React.FC<IAwardWinnerEditProps> = (props) => {
    const editorRef = React.createRef<Editor>();
    const { winner } = props;

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    const newModel = new AwardWinner(values);
                    newModel.id = winner.id;
                    newModel.notes = editorRef.current?.getInstance().getMarkdown() || "";
                    props.Save(newModel);
                }}
                initialValues={winner}>
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="winner.year">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                name="year"
                                placeholder="Year"
                                value={values.year.toString()}
                                isValid={touched.year && !errors.year}
                                isInvalid={!!errors.year}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
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
                        <Form.Group controlId="winner.notes">
                            <Form.Label>Notes</Form.Label>
                            <Editor
                                initialValue={values.notes}
                                previewStyle="tab"
                                height="200px"
                                initialEditType="wysiwyg"
                                useCommandShortcut={true}
                                useDefaultHTMLSanitizer={true}
                                hideModeSwitch={true}
                                ref={editorRef}
                            />
                        </Form.Group>
                        <SubmitButton />
                        <CancelButton canCancel={!winner.id} OnCancel={() => props.Cancel()} />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AwardWinnerEdit;
