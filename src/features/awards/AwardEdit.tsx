import React from "react";

import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import * as yup from "yup";

import CancelButton from "../../components/CancelButton";
import LoadingContainer from "../../components/LoadingContainer";
import { MarkdownField } from "../../components/MarkdownField";
import SubmitButton from "../../components/SubmitButton";
import { Award } from "../../models/Events";
import { useUpdateAwardMutation } from "./awardApi";
import { AwardEditProps } from "./awardPropTypes";

const schema = yup.object({
  description: yup.string().required(),
});

const AwardEdit: React.FC<AwardEditProps> = (props) => {
  const { award, onClose } = props;
  const [updateAward, { isLoading: isUpdating }] = useUpdateAwardMutation();

  const handleSave = async (award: Award) => {
    await updateAward(award.prepJson())
      .unwrap()
      .then(() => {
        toast.success(`Changes to ${award.name} have been saved.`);
        onClose();
      })
      .catch((error) => {
        toast.error("💣 " + error);
      });
  };

  return (
    <LoadingContainer loading={isUpdating}>
      <Formik validationSchema={schema} onSubmit={handleSave} initialValues={award}>
        {({ handleSubmit, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="awardDescription">
              <Form.Label>Description</Form.Label>
              <MarkdownField name="description" value={values.description} height="300px" />
            </Form.Group>
            <SubmitButton />
            <CancelButton canCancel={true} OnCancel={onClose} />
          </Form>
        )}
      </Formik>
    </LoadingContainer>
  );
};

export default AwardEdit;
