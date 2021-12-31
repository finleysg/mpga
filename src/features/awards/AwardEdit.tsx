import "@toast-ui/editor/dist/toastui-editor.css";
import "codemirror/lib/codemirror.css";

import { Editor } from "@toast-ui/react-editor";

import React, { useRef } from "react";

import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import SubmitButton from "../../components/SubmitButton";
import { useUpdateAwardMutation } from "../../services/MpgaApi";
import { AwardEditProps } from "./AwardPropTypes";

const schema = yup.object({
  description: yup.string().required(),
});

const AwardEdit: React.FC<AwardEditProps> = (props) => {
  const editorRef = useRef<Editor>();
  const { award } = props;
  const [, { isLoading: isUpdating }] = useUpdateAwardMutation();

  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          const newModel = values;
          newModel.id = award.id;
          newModel.description = editorRef.current?.getInstance().getMarkdown() || award.description;
          props.Save(newModel);
        }}
        initialValues={award}
      >
        {({ handleSubmit, values }) => (
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
            <SubmitButton busy={isUpdating} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AwardEdit;
