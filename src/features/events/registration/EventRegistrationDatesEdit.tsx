import React from "react";

import CancelButton from "components/CancelButton";
import LoadingContainer from "components/LoadingContainer";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { DatePickerField } from "../../../components/DatePickerField";
import SubmitButton from "../../../components/SubmitButton";
import { EventDetail } from "../../../models/Events";
import { prepareEvent, useUpdateEventMutation } from "../eventsApi";
import { EventEditProps } from "../eventsPropType";

const schema = yup.object({
  registrationStart: yup.date().required(),
  registrationEnd: yup.date().required(),
});

const EventRegistrationDatesEdit: React.FC<EventEditProps> = (props) => {
  const { eventDetail, onClose } = props;
  const [updateEvent, { isLoading }] = useUpdateEventMutation();

  const handleSave = async (value: EventDetail) => {
    const data = prepareEvent(value);
    await updateEvent(data)
      .unwrap()
      .then(() => {
        toast.success(`Registration information for ${eventDetail.name} has been saved.`);
        onClose();
      })
      .catch((error) => {
        toast.error("💣 " + error);
      });
  };

  return (
    <LoadingContainer loading={isLoading}>
      <Formik validationSchema={schema} onSubmit={handleSave} initialValues={eventDetail}>
        {({ handleSubmit, setFieldValue, handleBlur, values, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="eventDetail.registrationStart">
              <Form.Label className="full-width">Registration Start</Form.Label>
              <DatePickerField
                name="registrationStart"
                value={values.registrationStart}
                onChange={setFieldValue}
                onBlur={handleBlur}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="yyyy-MM-dd h:mm aa"
              />
              <Form.Control.Feedback type="invalid">{errors.registrationStart}</Form.Control.Feedback>
              <Form.Text className="text-muted">Registration starts at this date and time.</Form.Text>
            </Form.Group>
            <Form.Group controlId="eventDetail.registrationEnd">
              <Form.Label className="full-width">Online Registration End</Form.Label>
              <DatePickerField
                name="registrationEnd"
                value={values.registrationEnd}
                onChange={setFieldValue}
                onBlur={handleBlur}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="yyyy-MM-dd h:mm aa"
              />
              <Form.Control.Feedback type="invalid">{errors.registrationEnd}</Form.Control.Feedback>
              <Form.Text className="text-muted">Registration ends at this date and time.</Form.Text>
            </Form.Group>
            <SubmitButton />
            <CancelButton canCancel={true} OnCancel={onClose} />
          </Form>
        )}
      </Formik>
    </LoadingContainer>
  );
};

export default EventRegistrationDatesEdit;
