import { Formik } from 'formik';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';

import Confirm from '../../components/Confirm';
import FilePicker from '../../components/FilePicker';
import { ITag, MpgaDocument } from '../../models/Documents';
import TagPicker from '../tags/TagPicker';

export interface IDocumentEdit {
    document: MpgaDocument;
    file?: File;
    Cancel: () => void;
    Save: (file: File, document: MpgaDocument) => void;
    Delete: (document: MpgaDocument) => void;
}

interface IDocument {
    id?: number;
    year?: number;
    title: string;
    documentType: string;
    file?: File;
    tags?: ITag[];
}

const schema = yup.object({
    year: yup.number().required(),
    title: yup.string().required(),
    documentType: yup.string().required(),
});

const DocumentEdit: React.FC<IDocumentEdit> = props => {
    const doc: IDocument = {
        id: props.document.id,
        year: props.document.year,
        title: props.document.title,
        documentType: props.document.documentType,
        tags: props.document.tags,
    };
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleConfirmRemoveCancel = () => {
        setShowConfirmation(false);
    };

    const handleConfirmRemoveContinue = () => {
        setShowConfirmation(false);
        props.Delete(props.document);
    };

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(false);
                    const newModel = new MpgaDocument(values);
                    newModel.id = props.document.id;
                    newModel.tournament = props.document.tournament;
                    newModel.documentType = values.documentType;
                    newModel.tags = values.tags;
                    props.Save(values.file!, newModel);
                }}
                initialValues={doc}>
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        {props.document.year === undefined && (
                            <Form.Group controlId="doc.Year">
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    placeholder="Year"
                                    name="year"
                                    value={values.year?.toString()}
                                    isValid={touched.year && !errors.year}
                                    isInvalid={!!errors.year}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                            </Form.Group>
                        )}
                        <Form.Group controlId="doc.Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                placeholder="Document title"
                                name="title"
                                value={values.title}
                                isValid={touched.title && !errors.title}
                                isInvalid={!!errors.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        </Form.Group>
                        {props.document.documentType === undefined && (
                            <Form.Group controlId="doc.DocumentType">
                                <Form.Label>Document type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="documentType"
                                    value={values.documentType}
                                    isValid={touched.documentType && !errors.documentType}
                                    isInvalid={!!errors.documentType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
                                    <option>Agenda</option>
                                    <option>Financial</option>
                                    <option>MatchPlay</option>
                                    <option>Minutes</option>
                                    <option>Other</option>
                                    <option>Registration</option>
                                    <option>Results</option>
                                    <option>Tee Times</option>
                                </Form.Control>
                            </Form.Group>
                        )}
                        <FilePicker OnSelected={(files: any[]) => (values.file = files[0])} />
                        <TagPicker selectedTags={values.tags || []} OnChange={(tags: ITag[]) => (values.tags = tags)} />
                        <Button variant="primary" type="submit" size="sm" className="mt-2" disabled={isSubmitting}>
                            Save
                        </Button>
                        {doc.id !== 0 && (
                            <Button
                                className="ml-1 mt-2"
                                variant="outline-danger"
                                size="sm"
                                onClick={() => setShowConfirmation(true)}>
                                Delete
                            </Button>
                        )}
                        {doc.id === 0 && (
                            <Button className="ml-1 mt-2" variant="light" size="sm" onClick={props.Cancel}>
                                Cancel
                            </Button>
                        )}
                    </Form>
                )}
            </Formik>
            <Confirm
                show={showConfirmation}
                titleText="Delete Document?"
                messageText="Please confirm that we should delete this document."
                confirmText="Delete"
                DoCancel={handleConfirmRemoveCancel}
                DoConfirm={handleConfirmRemoveContinue}
            />
        </div>
    );
};

export default DocumentEdit;
