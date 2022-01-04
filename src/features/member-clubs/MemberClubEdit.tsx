import React from "react";

import LoadingContainer from "components/LoadingContainer";
import { MarkdownField } from "components/MarkdownField";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import * as yup from "yup";

import CancelButton from "../../components/CancelButton";
import SubmitButton from "../../components/SubmitButton";
import { Club } from "../../models/Clubs";
import { useUpdateClubMutation } from "./memberClubApi";
import { MemberClubEditProps } from "./memberClubPropTypes";

const schema = yup.object({
  name: yup.string().max(200).required(),
  website: yup.string().max(300).url(),
  size: yup.number(),
  notes: yup.string(),
});

const MemberClubEdit: React.FC<MemberClubEditProps> = (props) => {
  const { club, onClose } = props;

  const [updateClub, { isLoading }] = useUpdateClubMutation();

  const handleSave = async (values: Club) => {
    const newModel = Object.assign({}, club, values);
    await updateClub(newModel)
      .unwrap()
      .then(() => {
        toast.success("Your changes have been saved.");
        onClose();
      })
      .catch((error) => {
        toast.error("💣 " + error);
      });
  };

  return (
    <LoadingContainer loading={isLoading}>
      <Formik validationSchema={schema} onSubmit={handleSave} initialValues={club}>
        {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="club.Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                placeholder="Official club name"
                value={values.name}
                isValid={touched.name && !errors.name}
                isInvalid={!!errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="club.Website">
              <Form.Label>Website</Form.Label>
              <Form.Control
                name="website"
                placeholder="Website"
                value={values.website}
                isValid={touched.website && !errors.website}
                isInvalid={!!errors.website}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.website}</Form.Control.Feedback>
              <Form.Text className="text-muted">Full url, included protocol (http/https)</Form.Text>
            </Form.Group>
            <Form.Group controlId="club.Size">
              <Form.Label>Club size</Form.Label>
              <Form.Control
                name="size"
                value={values.size?.toString()}
                isValid={touched.size && !errors.size}
                isInvalid={!!errors.size}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.size}</Form.Control.Feedback>
              <Form.Text className="text-muted">Current number of members.</Form.Text>
            </Form.Group>
            <Form.Group controlId="club.Notes">
              <Form.Label>Notes</Form.Label>
              <MarkdownField name="notes" value={values.notes} height="360px" />
            </Form.Group>
            <SubmitButton />
            <CancelButton OnCancel={onClose} canCancel={true} />
          </Form>
        )}
      </Formik>
    </LoadingContainer>
  );
};

export default MemberClubEdit;
