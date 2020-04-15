import { Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import FilePicker from "../../components/FilePicker";
import { ITag, MpgaPhoto } from "../../models/Documents";
import TagPicker from "../tags/TagPicker";
import { Tournament } from "../../models/Events";

export interface IPhotoUpload {
    tournament: Tournament;
    year?: number;
    Save: (file: File, photo: MpgaPhoto) => void;
}

interface IPhoto {
    id?: number;
    year?: number;
    caption: string;
    file?: File;
    tags?: ITag[];
}

const schema = yup.object({
    year: yup.number().required(),
    caption: yup.string().max(240),
});

const PhotoUpload: React.FC<IPhotoUpload> = props => {
    const pic: IPhoto = {
        year: props.year,
        caption: "",
        tags: [],
    };

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(false);
                    const newModel = new MpgaPhoto(values);
                    newModel.id = 0;
                    newModel.tournament = props.tournament.id;
                    newModel.photoType = "Other";
                    newModel.tags = values.tags;
                    props.Save(values.file!, newModel);
                }}
                initialValues={pic}>
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        {props.year === undefined && (
                            <Form.Group controlId="doc.Year">
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    placeholder="Year"
                                    name="year"
                                    value={values.year?.toString()}
                                    isValid={touched.year && !errors.year}
                                    isInvalid={!!errors.year}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                            </Form.Group>
                        )}
                        <Form.Group controlId="caption">
                            <Form.Label>Caption</Form.Label>
                            <Form.Control
                                placeholder="Caption - please include name(s)"
                                name="caption"
                                value={values.caption}
                                isValid={touched.caption && !errors.caption}
                                isInvalid={!!errors.caption}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.caption}</Form.Control.Feedback>
                        </Form.Group>
                        <FilePicker
                            OnSelected={(files: any[]) => (values.file = files[0])}
                            accept=".gif,.jpg,.png,image/gif,image/jpeg,image/png"
                        />
                        <TagPicker selectedTags={values.tags || []} OnChange={(tags: ITag[]) => (values.tags = tags)} />
                        <Button variant="secondary" type="submit" size="sm" className="mt-2" disabled={isSubmitting}>
                            Save
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PhotoUpload;
