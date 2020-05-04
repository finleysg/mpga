import { Formik } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import SubmitButton from "../../components/SubmitButton";
import { Award } from "../../models/Events";
import { IAwardViewProps } from "./AwardView";
import { Editor } from "@toast-ui/react-editor";

export interface IAwardEditProps extends IAwardViewProps {
    Save: (policy: Award) => void;
}

const schema = yup.object({
    description: yup.string().required(),
});

const AwardEdit: React.FC<IAwardEditProps> = (props) => {
    const editorRef = React.createRef<Editor>();
    const award = props.award;

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    const newModel = new Award(values);
                    newModel.id = award.id;
                    newModel.description = editorRef.current?.getInstance().getMarkdown() || award.description;
                    props.Save(newModel);
                }}
                initialValues={award}>
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="awardDescription">
                            <Form.Label>Description</Form.Label>
                            <Editor
                                initialValue={values.description}
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

export default AwardEdit;
