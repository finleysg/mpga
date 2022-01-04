import React from "react";

import { useAppSelector } from "app-store";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import { IApplicationState } from "../../store";

export interface IChangeEmailFormProps {
  email?: string;
  OnChange: (email: string) => void;
}

const schema = yup.object({
  email: yup.string().email().required(),
});

const ChangeEmailForm: React.FC<IChangeEmailFormProps> = (props) => {
  const session = useAppSelector((state: IApplicationState) => state.session);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        props.OnChange(values.email);
      }}
      initialValues={{ email: props.email || "" }}
    >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isValid }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>New Email</Form.Label>
            <Form.Control
              placeholder="New Email"
              name="email"
              type="email"
              value={values.email}
              isValid={touched.email && !errors.email}
              isInvalid={!!errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            size="sm"
            className="mt-2"
            disabled={session.flags.isBusy || !isValid}
          >
            Change Email
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeEmailForm;
