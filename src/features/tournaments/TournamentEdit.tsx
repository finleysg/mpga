import React from "react";

import { MarkdownField } from "components/MarkdownField";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import SubmitButton from "../../components/SubmitButton";
import { Tournament } from "../../models/Events";
import { ITournamentViewProps } from "./TournamentView";

export interface ITournamentEditProps extends ITournamentViewProps {
  Save: (tournament: Tournament) => void;
}

const schema = yup.object({
  name: yup.string().max(120).required(),
  description: yup.string().required(),
});

const TournamentEdit: React.FC<ITournamentEditProps> = (props) => {
  const tournament = props.tournament;

  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          const newModel = new Tournament(values);
          newModel.id = tournament.id;
          props.Save(newModel);
        }}
        initialValues={tournament}
      >
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TournamentEdit;
