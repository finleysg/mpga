import React from "react"

import { Formik } from "formik"
import Form from "react-bootstrap/Form"
import { toast } from "react-toastify"
import * as yup from "yup"

import CancelButton from "../../components/CancelButton"
import LoadingContainer from "../../components/LoadingContainer"
import { MarkdownField } from "../../components/MarkdownField"
import SubmitButton from "../../components/SubmitButton"
import { AwardWinner } from "../../models/Events"
import { useAddWinnerMutation, useUpdateWinnerMutation } from "./awardApi"
import { AwardWinnerEditProps } from "./awardPropTypes"

const schema = yup.object({
	year: yup.number().required(),
	winner: yup.string().max(100).required(),
	notes: yup.string(),
})

const AwardWinnerEdit: React.FC<AwardWinnerEditProps> = (props) => {
	const { winner, onClose } = props

	const [updateWinner, { isLoading: isUpdating }] = useUpdateWinnerMutation()
	const [addWinner, { isLoading: isSaving }] = useAddWinnerMutation()

	const handleSave = async (winner: AwardWinner) => {
		const data = winner.prepJson()
		const mutation = winner.id > 0 ? updateWinner(data) : addWinner(data)
		await mutation
			.unwrap()
			.then(() => {
				toast.success(`${winner.winner} has been saved.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	return (
		<LoadingContainer loading={isSaving || isUpdating}>
			<Formik validationSchema={schema} onSubmit={handleSave} initialValues={winner}>
				{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="winner.year" className="mb-2">
							<Form.Label className="mb-0">Year</Form.Label>
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
						<Form.Group controlId="winner.winner" className="mb-2">
							<Form.Label className="mb-0">Winner</Form.Label>
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
						<Form.Group controlId="winner.notes" className="mb-2">
							<Form.Label className="mb-0">Notes</Form.Label>
							<MarkdownField name="notes" value={values.notes} height="200px" />
						</Form.Group>
						<SubmitButton />
						<CancelButton canCancel={true} OnCancel={onClose} />
					</Form>
				)}
			</Formik>
		</LoadingContainer>
	)
}

export default AwardWinnerEdit
