import { Formik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';

import { Club } from '../../models/Clubs';

export interface IMemberClubEditProps {
    club: Club,
    Save: (club: Club) => void,
};

const schema = yup.object({
    name: yup.string().max(200).required(),
    website: yup.string().max(300).url(),
    size: yup.number(),
    notes: yup.string(),
});

const MemberClubEdit: React.FC<IMemberClubEditProps> = (props) => {
    const club = props.club;

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    const newModel = new Club(values);
                    newModel.id = props.club.id;
                    props.Save(newModel);
                    actions.setSubmitting(false);
                }}
                initialValues={club}
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
                        <Form.Group controlId="club.Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name"
                                placeholder="Official club name"
                                value={values.name}
                                isValid={touched.name && !errors.name}
                                isInvalid={!!errors.name}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="club.Website">
                            <Form.Label>Website</Form.Label>
                            <Form.Control name="website"
                                placeholder="Website"
                                value={values.website}
                                isValid={touched.website && !errors.website}
                                isInvalid={!!errors.website}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.website}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Full url, included protocol (http/https)
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="club.Size">
                            <Form.Label>Club size</Form.Label>
                            <Form.Control name="size"
                                value={values.size?.toString()}
                                isValid={touched.size && !errors.size}
                                isInvalid={!!errors.size}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.size}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Current number of members.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="club.Notes">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control as="textarea" rows="8" name="notes"
                                value={values.notes}
                                isValid={touched.notes && !errors.notes}
                                isInvalid={!!errors.notes}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.notes}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Markdown supported. Tell us about your club.
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

export default MemberClubEdit;