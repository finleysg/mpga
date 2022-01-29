import React from "react";

import CancelButton from "components/CancelButton";
import LoadingContainer from "components/LoadingContainer";
import { MarkdownField } from "components/MarkdownField";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import * as yup from "yup";

import SubmitButton from "../../components/SubmitButton";
import { TournamentWinner } from "../../models/Events";
import { useAddTournamentWinnerMutation, useUpdateTournamentWinnerMutation } from "./tournamentApi";
import { TournamentWinnerEditProps } from "./tournamentPropTypes";

const schema = yup.object({
  year: yup.number().required(),
  location: yup.string().max(100).required(),
  winner: yup.string().max(100).required(),
  winnerClub: yup.string().max(100).required(),
  coWinner: yup.string().max(100).nullable(),
  coWinnerClub: yup.string().max(100).nullable(),
  flightOrDivision: yup.string().max(20).required(),
  score: yup.string().max(20),
  isNet: yup.bool(),
  isMatch: yup.bool(),
  notes: yup.string().nullable(),
});

const TournamentWinnerEdit: React.FC<TournamentWinnerEditProps> = (props) => {
  const { winner, onClose } = props;

  const [updateTournamentWinner, { isLoading: isUpdating }] = useUpdateTournamentWinnerMutation();
  const [addTournamentWinner, { isLoading: isSaving }] = useAddTournamentWinnerMutation();

  const handleSave = async (value: TournamentWinner) => {
    const data = value.prepJson();

    const mutation = winner.id > 0 ? updateTournamentWinner(data) : addTournamentWinner(data);
    await mutation
      .unwrap()
      .then(() => {
        toast.success(`A tournament winner (${winner.winner}) has been saved.`);
        onClose();
      })
      .catch((error) => {
        toast.error("💣 " + error);
      });
  };

  return (
    <LoadingContainer loading={isSaving || isUpdating}>
      <Formik validationSchema={schema} onSubmit={handleSave} initialValues={winner}>
        {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="winner.year">
              <Form.Label>Year</Form.Label>
              <Form.Control
                name="year"
                value={values.year.toString()}
                isValid={touched.year && !errors.year}
                isInvalid={!!errors.year}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="winner.location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                name="location"
                placeholder="Location"
                value={values.location}
                isValid={touched.location && !errors.location}
                isInvalid={!!errors.location}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="winner.flightOrDivision">
              <Form.Label>Flight/Division</Form.Label>
              <Form.Control
                name="flightOrDivision"
                placeholder="Flight/Division"
                value={values.flightOrDivision}
                isValid={touched.flightOrDivision && !errors.flightOrDivision}
                isInvalid={!!errors.flightOrDivision}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.flightOrDivision}</Form.Control.Feedback>
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
            <Form.Group controlId="winner.winnerClub">
              <Form.Label>Winner Club</Form.Label>
              <Form.Control
                name="winnerClub"
                placeholder="Winner's Club"
                value={values.winnerClub}
                isValid={touched.winnerClub && !errors.winnerClub}
                isInvalid={!!errors.winnerClub}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.winnerClub}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="winner.coWinner">
              <Form.Label>Co-Winner (team events)</Form.Label>
              <Form.Control
                name="coWinner"
                placeholder="Co-Winner"
                value={values.coWinner}
                isValid={touched.coWinner && !errors.coWinner}
                isInvalid={!!errors.coWinner}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.coWinner}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="winner.coWinnerClub">
              <Form.Label>Co-Winner Club</Form.Label>
              <Form.Control
                name="coWinnerClub"
                placeholder="Co-Winner's Club"
                value={values.coWinnerClub}
                isValid={touched.coWinnerClub && !errors.coWinnerClub}
                isInvalid={!!errors.coWinnerClub}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.coWinnerClub}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="winner.score">
              <Form.Label>Score</Form.Label>
              <Form.Control
                name="score"
                placeholder="Score"
                value={values.score}
                isValid={touched.score && !errors.score}
                isInvalid={!!errors.score}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.score}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="winner.isNet">
              <Form.Check
                type="switch"
                name="isNet"
                value={values.isNet.toString()}
                checked={values.isNet}
                label="This is a net score"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="winner.isMatch">
              <Form.Check
                type="switch"
                name="isMatch"
                value={values.isMatch.toString()}
                checked={values.isMatch}
                label="Match play"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="winner.notes">
              <Form.Label>Notes</Form.Label>
              <MarkdownField name="notes" value={values.notes} height="240px" />
            </Form.Group>
            <SubmitButton />
            <CancelButton canCancel={true} OnCancel={onClose} />
          </Form>
        )}
      </Formik>
    </LoadingContainer>
  );
};

export default TournamentWinnerEdit;
