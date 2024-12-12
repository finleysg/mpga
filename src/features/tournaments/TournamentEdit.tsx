import React from "react";

import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import * as yup from "yup";

import CancelButton from "../../components/CancelButton";
import LoadingContainer from "../../components/LoadingContainer";
import { MarkdownField } from "../../components/MarkdownField";
import SubmitButton from "../../components/SubmitButton";
import { Tournament } from "../../models/Events";
import { useUpdateTournamentMutation } from "./tournamentApi";
import { TournamentEditProps } from "./tournamentPropTypes";

const schema = yup.object({
  name: yup.string().max(120).required(),
  description: yup.string().required(),
});

const TournamentEdit: React.FC<TournamentEditProps> = (props) => {
  const { tournament, onClose } = props;
  const [updateTournament, { isLoading }] = useUpdateTournamentMutation();

  const handleSave = async (value: Tournament) => {
    const data = value.prepJson();
    await updateTournament(data)
      .unwrap()
      .then(() => {
        toast.success(`Your changes to ${value.name} have been saved.`);
        onClose();
      })
      .catch((error) => {
        toast.error("💣 " + error);
      });
  };

  return (
    <LoadingContainer loading={isLoading}>
      <Formik validationSchema={schema} onSubmit={handleSave} initialValues={tournament}>
        {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="tournament.Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                placeholder="Name"
                value={values.name}
                isValid={touched.name && !errors.name}
                isInvalid={!!errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="tournament.Description">
              <Form.Label>Description</Form.Label>
              <MarkdownField name="description" value={values.description} height="400px" />
            </Form.Group>
            <SubmitButton />
            <CancelButton canCancel={true} OnCancel={onClose} />
          </Form>
        )}
      </Formik>
    </LoadingContainer>
  );
};

export default TournamentEdit;
