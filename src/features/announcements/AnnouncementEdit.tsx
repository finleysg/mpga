import { Formik } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import CancelButton from "../../components/CancelButton";
import { DatePickerField } from "../../components/DatePickerField";
import SubmitButton from "../../components/SubmitButton";
import { Announcement } from "../../models/Announcement";
import { MpgaDocument } from "../../models/Documents";
import { IAnnouncementView } from "./AnnouncementView";
import { Editor } from "@toast-ui/react-editor";

export interface IAnnouncementEdit extends IAnnouncementView {
    currentDocuments: MpgaDocument[];
    Cancel: () => void;
    Save: (announcement: Announcement) => void;
}

interface IAnnouncementData {
    title: string;
    text: string;
    starts: Date;
    expires: Date;
    externalUrl?: string;
    externalName?: string;
    event?: number;
    document?: string;
}

const schema = yup.object({
    title: yup.string().required(),
    // text: yup.string().required(),
    starts: yup.date().required(),
    expires: yup.date().required(),
    documentId: yup.string().nullable(),
    externalUrl: yup.string().url().nullable(),
    externalName: yup.string().when("externalUrl", {
        is: (url) => url && url.length > 0,
        then: yup.string().required("a display name is required for the url"),
        otherwise: yup.string().nullable(),
    }),
});

const AnnouncementEdit: React.FC<IAnnouncementEdit> = (props) => {
    const editorRef = React.createRef<Editor>();
    const announcement = props.announcement;
    const announcementData = {
        title: announcement.title,
        text: announcement.text,
        starts: announcement.starts,
        expires: announcement.expires,
        externalUrl: announcement.externalUrl,
        externalName: announcement.externalName,
        event: announcement.event,
        document: announcement.document?.id?.toString(),
    } as IAnnouncementData;

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    const newModel = new Announcement(values);
                    newModel.id = props.announcement.id;
                    newModel.document = props.currentDocuments.find((d) => d.id?.toString() === values.document);
                    newModel.text = editorRef.current?.getInstance().getMarkdown() || announcement.text;
                    props.Save(newModel);
                }}
                initialValues={announcementData}>
                {({ handleSubmit, setFieldValue, handleChange, handleBlur, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="announcement.Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                placeholder="Announcement title"
                                name="title"
                                value={values.title}
                                isValid={touched.title && !errors.title}
                                isInvalid={!!errors.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Text</Form.Label>
                            <Editor
                                initialValue={values.text}
                                previewStyle="tab"
                                height="240px"
                                initialEditType="wysiwyg"
                                useCommandShortcut={true}
                                useDefaultHTMLSanitizer={true}
                                hideModeSwitch={true}
                                ref={editorRef}
                            />
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
                            <Form.Control.Feedback type="invalid">{errors.starts}</Form.Control.Feedback>
                            <Form.Text className="text-muted">Message is visible starting on this date.</Form.Text>
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
                            <Form.Control.Feedback type="invalid">{errors.expires}</Form.Control.Feedback>
                            <Form.Text className="text-muted">Message is no longer visible after this date.</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="document">
                            <Form.Label>Attach a Document (optional)</Form.Label>
                            <Form.Control
                                as="select"
                                name="document"
                                value={values.document || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option value={undefined}></option>
                                {props.currentDocuments.map((doc) => {
                                    return (
                                        <option key={doc.id} value={doc.id}>
                                            {doc.title}
                                        </option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="announcement.ExternalUrl">
                            <Form.Label>Link (optional)</Form.Label>
                            <Form.Control
                                type="url"
                                placeholder="Url"
                                name="externalUrl"
                                value={values.externalUrl}
                                isValid={touched.externalUrl && !errors.externalUrl}
                                isInvalid={!!errors.externalUrl}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.externalUrl}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="announcement.ExternalName">
                            <Form.Label>Link name (optional)</Form.Label>
                            <Form.Control
                                placeholder="Display name for url"
                                name="externalName"
                                value={values.externalName}
                                isValid={touched.externalName && !errors.externalName}
                                isInvalid={!!errors.externalName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.externalName}</Form.Control.Feedback>
                        </Form.Group>
                        <SubmitButton />
                        <CancelButton canCancel={announcement.id === 0} OnCancel={() => props.Cancel()} />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AnnouncementEdit;
