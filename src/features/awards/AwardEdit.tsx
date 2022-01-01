import React from "react";

import CancelButton from "components/CancelButton";
import { MarkdownField } from "components/MarkdownField";
import { Formik } from "formik";
import { Award } from "models/Events";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import * as yup from "yup";

import SubmitButton from "../../components/SubmitButton";
import { useUpdateAwardMutation } from "../../services/AwardEndpoints";
import { AwardEditProps } from "./AwardPropTypes";

const schema = yup.object({
  description: yup.string().required(),
});

const AwardEdit: React.FC<AwardEditProps> = (props) => {
  const { award, onSave, onCancel } = props;
  const [updateAward, { isLoading: isUpdating }] = useUpdateAwardMutation();

  const handleSave = async (award: Award) => {
    await updateAward(award.prepJson())
      .unwrap()
      .then(() => {
        toast.success(`Changes to ${award.name} have been saved.`);
        onSave(award);
      })
      .catch((error) => {
        toast.error("💣 " + error);
      });
  };

  return (
    <div>
      <Formik validationSchema={schema} onSubmit={handleSave} initialValues={award}>
        {({ handleSubmit, handleChange, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="awardDescription">
              <Form.Label>Description</Form.Label>
              <MarkdownField name="description" value={values.description} height="300px" />
            </Form.Group>
            <SubmitButton busy={isUpdating} />
            <CancelButton canCancel={true} OnCancel={onCancel} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AwardEdit;
