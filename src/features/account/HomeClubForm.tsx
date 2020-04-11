import { Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import { IClub } from "../../models/Clubs";

export interface IHomeClubFormProps {
    clubs: IClub[];
    homeClub?: string;
    OnChange: (homeClub: string) => void;
}

const schema = yup.object({
    homeClub: yup.string().required(),
});

const HomeClubForm: React.FC<IHomeClubFormProps> = (props) => {
    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    props.OnChange(values.homeClub!);
                }}
                initialValues={{homeClub: props.homeClub}}>
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="ec.homeClub">
                            <Form.Label>Home club</Form.Label>
                            <Form.Control
                                as="select"
                                name="homeClub"
                                value={values.homeClub || ""}
                                isValid={touched.homeClub && !errors.homeClub}
                                isInvalid={!!errors.homeClub}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option key={-1} value={undefined}></option>
                                <option key={0} value={undefined}>Other (not listed)</option>
                                {props.clubs.map((c) => {
                                    return (
                                        <option key={c.id} value={c.name}>
                                            {c.name}
                                        </option>
                                    );
                                })}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.homeClub}</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" size="sm" className="mt-2">
                            Update Home Club
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default HomeClubForm;
