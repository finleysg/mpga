import React from "react";

import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import { useAppSelector } from "../../app-store";
import { IApplicationState } from "../../store";

export interface IChangeNameFormProps {
  firstName: string;
  lastName: string;
  OnChange: (firstName: string, lastName: string) => void;
}

const schema = yup.object({
  firstName: yup.string().required("Please enter your first name"),
  lastName: yup.string().required("Please enter your last name"),
});

const ChangeNameForm: React.FC<IChangeNameFormProps> = (props) => {
  const session = useAppSelector((state: IApplicationState) => state.session);

  return (
    <Formik
      validationSchema={schema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values) => {
        props.OnChange(values.firstName, values.lastName);
      }}
      initialValues={{ firstName: props.firstName, lastName: props.lastName }}
    >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="First Name"
              name="firstName"
              value={values.firstName}
              isValid={touched.firstName && !errors.firstName}
              isInvalid={!!errors.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder="Last Name"
              name="lastName"
              value={values.lastName}
              isValid={touched.lastName && !errors.lastName}
              isInvalid={!!errors.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" size="sm" className="mt-2" disabled={session.flags.isBusy}>
            Change Name
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeNameForm;
