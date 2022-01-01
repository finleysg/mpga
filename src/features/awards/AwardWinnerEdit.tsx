import React from "react";

import { MarkdownField } from "components/MarkdownField";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import * as yup from "yup";

import CancelButton from "../../components/CancelButton";
import SubmitButton from "../../components/SubmitButton";
import { AwardWinner } from "../../models/Events";
import { useAddWinnerMutation, useUpdateWinnerMutation } from "../../services/AwardEndpoints";
import { AwardWinnerEditProps } from "./AwardPropTypes";

const schema = yup.object({
  year: yup.number().required(),
  winner: yup.string().max(100).required(),
  notes: yup.string(),
});

const AwardWinnerEdit: React.FC<AwardWinnerEditProps> = (props) => {
  const { winner, onCancel, onSave } = props;

  const [updateWinner, { isLoading: isUpdating }] = useUpdateWinnerMutation();
  const [addWinner, { isLoading: isSaving }] = useAddWinnerMutation();

  const handleSave = async (winner: AwardWinner) => {
    const data = winner.prepJson();
    const mutation = winner.id > 0 ? updateWinner(data) : addWinner(data);
    await mutation
      .unwrap()
      .then(() => {
        toast.success(`${winner.winner} has been saved.`);
        onSave(winner);
      })
      .catch((error) => {
        toast.error("💣 " + error);
      });
  };

  return (
    <div>
      <Formik validationSchema={schema} onSubmit={handleSave} initialValues={winner}>
        {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="winner.year">
              <Form.Label>Year</Form.Label>
              <Form.Control
                name="year"
                placeholder="Year"
                value={values.year.toString()}
                isValid={touched.year && !errors.year}
                isInvalid={!!errors.year}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="winner.winner">
              <Form.Label>Winner</Form.Label>
              <Form.Control
                name="winner"
                placeholder="Winner"
                value={values.winner}
                isValid={touched.winner && !errors.winner}
                isInvalid={!!errors.winner}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.winner}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="winner.notes">
              <Form.Label>Notes</Form.Label>
              <MarkdownField name="notes" value={values.notes} height="200px" />
            </Form.Group>
            <SubmitButton busy={isSaving || isUpdating} />
            <CancelButton canCancel={true} OnCancel={onCancel} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AwardWinnerEdit;
