import { Formik } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import { Editor } from "@toast-ui/react-editor";

import SubmitButton from "../../components/SubmitButton";
import { PageContent } from "../../models/Policies";
import { IPageContentViewProps } from "./PageContentView";

export interface IPageContentEditProps extends IPageContentViewProps {
    Save: (policy: PageContent) => void;
}

const schema = yup.object({
    title: yup.string().max(120).required(),
    // content: yup.string().required(),
});

const PageContentEdit: React.FC<IPageContentEditProps> = (props) => {
    const pageContent = props.pageContent;
    const editorRef = React.createRef<Editor>();

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    const newModel = new PageContent(values);
                    newModel.id = pageContent.id;
                    newModel.content = editorRef.current?.getInstance().getMarkdown() || pageContent.content;
                    props.Save(newModel);
                }}
                initialValues={pageContent}>
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
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
                        <Form.Group controlId="description">
                            <Form.Label>Text</Form.Label>
                            <Editor
                                initialValue={values.content}
                                previewStyle="tab"
                                height="300px"
                                initialEditType="wysiwyg"
                                useCommandShortcut={true}
                                useDefaultHTMLSanitizer={true}
                                hideModeSwitch={true}
                                ref={editorRef}
                            />
                        </Form.Group>
                        <SubmitButton />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PageContentEdit;
