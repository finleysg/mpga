import React from "react";

import CancelButton from "components/CancelButton";
import LoadingContainer from "components/LoadingContainer";
import SubmitButton from "components/SubmitButton";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import * as yup from "yup";

import FilePicker from "../../components/FilePicker";
import { ITag, MpgaPhoto } from "../../models/Documents";
import TagPicker from "../tags/TagPicker";
import { useAddPhotoMutation } from "./galleryApi";
import { PhotoUploadProps } from "./galleryPropTypes";

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

const PhotoUpload: React.FC<PhotoUploadProps> = (props) => {
  const { tournamentId, year, onClose } = props;
  const pic: IPhoto = {
    year: year,
    caption: "",
    tags: [],
  };

  const [addPhoto, { isLoading }] = useAddPhotoMutation();

  const handleSave = async (value: IPhoto) => {
    const newModel = new MpgaPhoto(value);
    newModel.id = 0;
    newModel.tournament = tournamentId;
    newModel.photoType = "Other";
    newModel.tags = value.tags;
    const params = {
      photo: newModel.prepJson(),
      file: value.file,
    };
    await addPhoto(params)
      .unwrap()
      .then(() => {
        toast.success(`Your photo has been saved.`);
        onClose();
      })
      .catch((error) => {
        toast.error("💣 " + error);
      });
  };

  return (
    <LoadingContainer loading={isLoading}>
      <Formik validationSchema={schema} onSubmit={handleSave} initialValues={pic}>
        {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
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
            <SubmitButton />
            <CancelButton canCancel={true} OnCancel={onClose} />
          </Form>
        )}
      </Formik>
    </LoadingContainer>
  );
};

export default PhotoUpload;
