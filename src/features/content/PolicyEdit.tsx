import React, { useState } from "react";

import { MarkdownField } from "components/MarkdownField";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import CancelButton from "../../components/CancelButton";
import Confirm from "../../components/Confirm";
import DeleteButton from "../../components/DeleteButton";
import SubmitButton from "../../components/SubmitButton";
import { Policy } from "../../models/Policies";
import { IPolicyViewProps } from "./PolicyView";

export interface IPolicyEditProps extends IPolicyViewProps {
  Cancel: () => void;
  Save: (policy: Policy) => void;
  Delete: (policy: Policy) => void;
}

const schema = yup.object({
  name: yup.string().max(30).required(),
  title: yup.string().max(120).required(),
  // description: yup.string().required(),
});

const PolicyEdit: React.FC<IPolicyEditProps> = (props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const policy = props.policy;

  const handleConfirmDeleteCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDeleteContinue = () => {
    setShowConfirmation(false);
    props.Delete(policy);
  };

  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          const newModel = new Policy(values);
          newModel.id = props.policy.id;
          props.Save(newModel);
        }}
        initialValues={policy}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="policy.Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                placeholder="Unique policy name"
                value={values.name}
                isValid={touched.name && !errors.name}
                isInvalid={!!errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              <Form.Text className="text-muted">This name is not displayed on the website</Form.Text>
            </Form.Group>
            <Form.Group controlId="policy.Title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                placeholder="Title"
                value={values.title}
                isValid={touched.title && !errors.title}
                isInvalid={!!errors.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="policy.Description">
              <Form.Label>Description</Form.Label>
              <MarkdownField name="description" value={values.description} height="240px" />
            </Form.Group>
            <SubmitButton />
            <DeleteButton canDelete={policy.id !== 0} OnDelete={() => setShowConfirmation(true)} />
            <CancelButton canCancel={policy.id === 0} OnCancel={() => props.Cancel()} />
          </Form>
        )}
      </Formik>
      <Confirm
        show={showConfirmation}
        titleText="Delete Policy?"
        messageText="Please confirm that we should delete this policy."
        confirmText="Delete Policy"
        DoCancel={handleConfirmDeleteCancel}
        DoConfirm={handleConfirmDeleteContinue}
      />
    </div>
  );
};

export default PolicyEdit;
