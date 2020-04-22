import { Formik } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import SubmitButton from "../../components/SubmitButton";
import { Award } from "../../models/Events";
import { IAwardViewProps } from "./AwardView";

export interface IAwardEditProps extends IAwardViewProps {
    Save: (policy: Award) => void;
}

const schema = yup.object({
    description: yup.string().required(),
});

const AwardEdit: React.FC<IAwardEditProps> = (props) => {
    const award = props.award;

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    const newModel = new Award(values);
                    newModel.id = award.id;
                    props.Save(newModel);
                }}
                initialValues={award}>
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="awardDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="12"
                                name="description"
                                placeholder="Award description"
                                value={values.description || ""}
                                isValid={touched.description && !errors.description}
                                isInvalid={!!errors.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                            <Form.Text className="text-muted">Markdown supported.</Form.Text>
                        </Form.Group>
                        <SubmitButton />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AwardEdit;
