import * as yup from "yup";
import React from "react";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Announcement } from "../../models/Announcement";
import { IAnnouncementView } from "./AnnouncementView";
import { DatePickerField } from "../../components/DatePickerField";

export interface IAnnouncementEdit extends IAnnouncementView {
    Cancel: () => void,
    Save: (announcement: Announcement) => void,
};

const schema = yup.object({
    title: yup.string().required(),
    text: yup.string().required(),
    starts: yup.date().required(),
    expires: yup.date().required(),
    externalUrl: yup.string().url(),
    externalName: yup.string().when('externalUrl', {
        is: (url) => url && url.length > 0,
        then: yup.string().required("a display name is required for the url"),
        otherwise: yup.string()
    }),
});

const AnnouncementEdit: React.FC<IAnnouncementEdit> = (props) => {
    let announcement = props.announcement;
    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    const newModel = new Announcement(values);
                    newModel.id = props.announcement.id;
                    props.Save(newModel);
                    actions.setSubmitting(false);
                }}
                initialValues={announcement}
            >
                {({
                    handleSubmit,
                    setFieldValue,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                    isSubmitting,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="announcement.Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control placeholder="Announcement title" name="title"
                                value={values.title}
                                isValid={touched.title && !errors.title}
                                isInvalid={!!errors.title}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="announcement.Text">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows="4" name="text"
                                value={values.text}
                                isValid={touched.text && !errors.text}
                                isInvalid={!!errors.text}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.text}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Markdown supported.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="announcement.Starts">
                            <Form.Label className="full-width">Display Start</Form.Label>
                            <DatePickerField
                                name="starts"
                                value={values.starts}
                                onChange={setFieldValue}
                                onBlur={handleBlur}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="yyyy-MM-dd h:mm aa"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.starts}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Message is visible starting on this date.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="announcement.Expires">
                            <Form.Label className="full-width">Expires</Form.Label>
                            <DatePickerField
                                name="expires"
                                value={values.expires}
                                onChange={setFieldValue}
                                onBlur={handleBlur}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="yyyy-MM-dd h:mm aa"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.expires}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Message is no longer visible after this date.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="announcement.ExternalUrl">
                            <Form.Label>Link (optional)</Form.Label>
                            <Form.Control type="url" placeholder="Url" name="externalUrl"
                                value={values.externalUrl}
                                isValid={touched.externalUrl && !errors.externalUrl}
                                isInvalid={!!errors.externalUrl}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.externalUrl}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="announcement.ExternalName">
                            <Form.Label>Link name (optional)</Form.Label>
                            <Form.Control placeholder="Display name for url" name="externalName"
                                value={values.externalName}
                                isValid={touched.externalName && !errors.externalName}
                                isInvalid={!!errors.externalName}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.externalName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="secondary" type="submit" size="sm" disabled={isSubmitting}>
                            Submit
                        </Button>
                        <Button className="ml-1" variant="outline-primary" size="sm">Add Document</Button>
                        {announcement.id === 0 &&
                            <Button className="ml-1" variant="light" size="sm" onClick={props.Cancel}>Cancel</Button>
                        }
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AnnouncementEdit;
