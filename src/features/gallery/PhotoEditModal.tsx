import { Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import * as yup from "yup";

import { ITag, MpgaPhoto } from "../../models/Documents";
import TagPicker from "../tags/TagPicker";

const PhotoImg = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

export interface IPhotoModalProps {
    show: boolean;
    photo: MpgaPhoto;
    onClose: () => void;
    Save: (photo: MpgaPhoto) => void;
}

const schema = yup.object({
    caption: yup
        .string()
        .max(240),
});

const PhotoEditModal: React.FC<IPhotoModalProps> = props => {
    const { photo } = props;

    return (
        <Modal size="xl" show={props.show} onHide={() => props.onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Add or Update the Photo Caption</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PhotoImg src={photo.imageUrl} />
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(false);
                        const newModel = new MpgaPhoto({
                            id: photo.id,
                            year: photo.year,
                            tournament: photo.tournament,
                            photo_type: photo.photoType,
                            created_by: photo.createdBy,
                            caption: values.caption,
                        });
                        newModel.tags = values.tags;
                        props.Save(newModel);
                    }}
                    initialValues={photo}>
                    {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group controlId="caption">
                                <Form.Label>Caption</Form.Label>
                                <Form.Control
                                    placeholder="Caption"
                                    name="caption"
                                    value={values.caption || ""}
                                    isValid={touched.caption && !errors.caption}
                                    isInvalid={!!errors.caption}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">{errors.caption}</Form.Control.Feedback>
                            </Form.Group>
                            <TagPicker
                                selectedTags={values.tags || []}
                                OnChange={(tags: ITag[]) => (values.tags = tags)}
                            />
                            <Button variant="secondary" type="submit" size="sm" className="mt-2" disabled={isSubmitting}>
                                Save
                            </Button>
                            <Button className="ml-1 mt-2" variant="light" size="sm" onClick={() => props.onClose()}>
                                Cancel
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default PhotoEditModal;
