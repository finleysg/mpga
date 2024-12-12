import React from "react";

import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import { useAppSelector } from "../../app-store";

export interface IForgotPasswordFormProps {
  email?: string;
  OnRequestReset: (email: string) => void;
}

const schema = yup.object({
  email: yup.string().email().required(),
});

const ForgotPasswordForm: React.FC<IForgotPasswordFormProps> = (props) => {
  const session = useAppSelector((state) => state.session);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        props.OnRequestReset(values.email);
      }}
      initialValues={{ email: props.email || "" }}
    >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isValid }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="email"
              name="email"
              type="email"
              readOnly={session.flags.pendingPasswordReset}
              value={values.email}
              isValid={touched.email && !errors.email}
              isInvalid={!!errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="secondary"
            type="submit"
            size="sm"
            className="mt-2"
            disabled={session.flags.isBusy || !isValid || session.flags.pendingPasswordReset}
          >
            Send Password Request
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
