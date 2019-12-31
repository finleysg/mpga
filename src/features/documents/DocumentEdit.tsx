import { Formik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';

import FilePicker from '../../components/FilePicker';
import { MpgaDocument, ITag } from '../../models/Documents';
import TagPicker from '../tags/TagPicker';
import { IDocumentView } from './DocumentView';

export interface IDocumentEdit extends IDocumentView {
    file?: File,
    Cancel: () => void,
    Save: (file: File, document: MpgaDocument) => void,
};

interface IDocument {
    id?: number,
    year: number,
    title: string,
    type: string,
    file?: File,
    tags?: ITag[],
};

const schema = yup.object({
    year: yup.number().required(),
    title: yup.string().required(),
});

const DocumentEdit: React.FC<IDocumentEdit> = (props) => {
    let doc: IDocument = {
        id: props.document.id,
        year: props.document.year,
        title: props.document.title,
        type: props.document.documentType,
        tags: props.document.tags,
    };

    return (
        <Formik
            validationSchema={schema}
            onSubmit={(values, actions) => {
                const newModel = new MpgaDocument(values);
                newModel.id = props.document.id;
                newModel.tags = values.tags;
                props.Save(values.file!, newModel);
                actions.setSubmitting(false);
            }}
            initialValues={doc}
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
                        <Form.Group controlId="doc.Year">
                            <Form.Label>Year</Form.Label>
                            <Form.Control placeholder="Year" name="year"
                                value={values.year.toString()}
                                isValid={touched.year && !errors.year}
                                isInvalid={!!errors.year}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.year}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="doc.Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control placeholder="Document title" name="title"
                                value={values.title}
                                isValid={touched.title && !errors.title}
                                isInvalid={!!errors.title}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="doc.DocumentType">
                            <Form.Label>Document type</Form.Label>
                            <Form.Control as="select">
                                <option>Other</option>
                                <option>Application</option>
                                <option>Results</option>
                            </Form.Control>
                        </Form.Group>
                        <FilePicker OnSelected={(files: any[]) => values.file = files[0]} />
                        <TagPicker selectedTags={values.tags || []} OnChange={(tags: ITag[]) => values.tags = tags} />
                        <Button variant="primary" type="submit" size="sm" className="mt-2" disabled={isSubmitting}>
                            Save
                        </Button>
                        {doc.id === 0 &&
                            <Button className="ml-1 mt-2" variant="light" size="sm" onClick={props.Cancel}>Cancel</Button>
                        }
                    </Form>
                )}
        </Formik>
    );
}

export default DocumentEdit;
