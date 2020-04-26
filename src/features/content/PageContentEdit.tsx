import { Formik } from "formik";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import SubmitButton from "../../components/SubmitButton";
import { PageContent } from "../../models/Policies";
import { IPageContentViewProps } from "./PageContentView";
import EditorModal from "../../components/EditorModal";
import Button from "react-bootstrap/Button";

export interface IPageContentEditProps extends IPageContentViewProps {
    Save: (policy: PageContent) => void;
}

const schema = yup.object({
    title: yup.string().max(120).required(),
    content: yup.string().required(),
});

const PageContentEdit: React.FC<IPageContentEditProps> = (props) => {
    const pageContent = props.pageContent;
    const [useEditor, setUseEditor] = useState(false);

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    const newModel = new PageContent(values);
                    newModel.id = pageContent.id;
                    props.Save(newModel);
                }}
                initialValues={pageContent}>
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="policy.Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                name="title"
                                placeholder="Title"
                                value={values.title}
                                isValid={touched.title && !errors.title}
                                isInvalid={!!errors.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="policy.Description">
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="12"
                                name="content"
                                placeholder="Page text"
                                value={values.content}
                                isValid={touched.content && !errors.content}
                                isInvalid={!!errors.content}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.content}</Form.Control.Feedback>
                            <Form.Text className="text-muted">Markdown supported.</Form.Text>
                        </Form.Group>
                        <SubmitButton />
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            className="ml-2"
                            onClick={() => setUseEditor(true)}>
                            Open Editor
                        </Button>
                        <EditorModal
                            text={values.content}
                            show={useEditor}
                            Cancel={() => setUseEditor(false)}
                            Close={(markdown) => {
                                values.content = markdown;
                                setUseEditor(false);
                            }}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PageContentEdit;
