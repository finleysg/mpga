import { Formik } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import { Editor } from "@toast-ui/react-editor";

import SubmitButton from "../../../components/SubmitButton";
import { EventDetail } from "../../../models/Events";

interface IEventDetailProps {
    eventDetail: EventDetail;
    Save: (eventDetail: EventDetail) => void;
}

const schema = yup.object({
    description: yup.string().required(),
});

const EventFormatEdit: React.FunctionComponent<IEventDetailProps> = (props) => {
    const { eventDetail } = props;
    const editorRef = React.createRef<Editor>();

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    const newModel = Object.assign({}, eventDetail);
                    newModel.description = editorRef.current?.getInstance().getMarkdown() || values.description;
                    props.Save(newModel);
                }}
                initialValues={eventDetail}>
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="description">
                            <Form.Label>Event format</Form.Label>
                            <Editor
                                initialValue={values.description}
                                previewStyle="tab"
                                height="480px"
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

export default EventFormatEdit;
