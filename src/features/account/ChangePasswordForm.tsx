import React from "react";

import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import { useAppSelector } from "../../app-store";
import { IApplicationState } from "../../store";

export interface IPasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IPasswordChangeFormProps {
  OnChange: (credentials: IPasswordChange) => void;
}

const schema = yup.object({
  currentPassword: yup.string().required("Your current password is required"),
  newPassword: yup.string().required("A new password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const ChangePasswordForm: React.FC<IPasswordChangeFormProps> = (props) => {
  const session = useAppSelector((state: IApplicationState) => state.session);

  return (
    <Formik
      validationSchema={schema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values) => {
        props.OnChange(values);
      }}
      initialValues={{} as IPasswordChange}
    >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="currentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              name="currentPassword"
              type="password"
              value={values.currentPassword || ""}
              isValid={touched.currentPassword && !errors.currentPassword}
              isInvalid={!!errors.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type="invalid">{errors.currentPassword}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              name="newPassword"
              type="password"
              value={values.newPassword || ""}
              isValid={touched.newPassword && !errors.newPassword}
              isInvalid={!!errors.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              value={values.confirmPassword || ""}
              isValid={touched.confirmPassword && !errors.confirmPassword}
              isInvalid={!!errors.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" size="sm" className="mt-2" disabled={session.flags.isBusy}>
            Change Password
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
