import * as yup from "yup";
import React from "react";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { DatePickerField } from "../../../components/DatePickerField";
import { EventDetail } from "../../../models/Events";

export interface IEventRegistrationDatesEditProps {
    eventDetail: EventDetail;
    Save: (eventDetail: EventDetail) => void;
}

const schema = yup.object({
    registrationStart: yup.date().required(),
    earlyRegistrationEnd: yup.date().required(),
    registrationEnd: yup.date().required(),
});

const EventRegistrationDatesEdit: React.FC<IEventRegistrationDatesEditProps> = props => {
    let eventDetail = props.eventDetail;
    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(false);
                    const newModel = Object.assign({}, eventDetail);
                    newModel.registrationStart = values.registrationStart;
                    newModel.registrationEnd = values.registrationEnd;
                    newModel.earlyRegistrationEnd = values.earlyRegistrationEnd;
                    props.Save(newModel);
                }}
                initialValues={eventDetail}>
                {({ handleSubmit, setFieldValue, handleBlur, values, errors, isSubmitting }) => (
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
                        <Form.Group controlId="eventDetail.earlyRegistrationEnd">
                            <Form.Label className="full-width">Mail-In Registration Deadline</Form.Label>
                            <DatePickerField
                                name="earlyRegistrationEnd"
                                value={values.earlyRegistrationEnd}
                                onChange={setFieldValue}
                                onBlur={handleBlur}
                                dateFormat="yyyy-MM-dd"
                            />
                            <Form.Control.Feedback type="invalid">{errors.earlyRegistrationEnd}</Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Registration forms must be postmarked by this date.
                            </Form.Text>
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
                            <Form.Text className="text-muted">
                                Online registration ends at this date and time.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="secondary" type="submit" size="sm" disabled={isSubmitting}>
                            Save
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EventRegistrationDatesEdit;
