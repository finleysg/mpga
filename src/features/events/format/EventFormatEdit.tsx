import React from "react";

import { MarkdownField } from "components/MarkdownField";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import SubmitButton from "../../../components/SubmitButton";
import { EventDetail } from "../../../models/Events";

interface IEventDetailProps {
  eventDetail: EventDetail;
  Save: (eventDetail: EventDetail) => void;
}

const schema = yup.object({
  description: yup.string().required(),
});

const EventFormatEdit: React.FunctionComponent<IEventDetailProps> = (props) => {
  const { eventDetail } = props;

  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          const newModel = Object.assign({}, eventDetail);
          props.Save(newModel);
        }}
        initialValues={eventDetail}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="description">
              <Form.Label>Event format</Form.Label>
              <MarkdownField name="description" value={values.description} height="480px" />
            </Form.Group>
            <SubmitButton />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventFormatEdit;
