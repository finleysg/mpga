import React from "react";

import CancelButton from "components/CancelButton";
import LoadingContainer from "components/LoadingContainer";
import { MarkdownField } from "components/MarkdownField";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import * as yup from "yup";

import SubmitButton from "../../../components/SubmitButton";
import { EventDetail } from "../../../models/Events";
import { useUpdateEventMutation } from "../eventsApi";
import { EventEditProps } from "../eventsPropType";

const schema = yup.object({
  description: yup.string().required(),
});

const EventFormatEdit: React.FunctionComponent<EventEditProps> = (props) => {
  const { eventDetail, onClose } = props;
  const [updateEvent, { isLoading }] = useUpdateEventMutation();

  const handleSave = async (value: EventDetail) => {
    const data = value.prepJson();
    await updateEvent(data)
      .unwrap()
      .then(() => {
        toast.success(`Format information for ${eventDetail.name} has been saved.`);
        onClose();
      })
      .catch((error) => {
        toast.error("💣 " + error);
      });
  };

  return (
    <LoadingContainer loading={isLoading}>
      <Formik validationSchema={schema} onSubmit={handleSave} initialValues={eventDetail}>
        {({ handleSubmit, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="description">
              <Form.Label>Event format</Form.Label>
              <MarkdownField name="description" value={values.description} height="480px" />
            </Form.Group>
            <SubmitButton />
            <CancelButton canCancel={true} OnCancel={onClose} />
          </Form>
        )}
      </Formik>
    </LoadingContainer>
  );
};

export default EventFormatEdit;
