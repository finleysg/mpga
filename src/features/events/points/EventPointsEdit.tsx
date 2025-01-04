import React, { useState } from "react"

import { Formik } from "formik"
import Form from "react-bootstrap/Form"
import { toast } from "react-toastify"
import * as yup from "yup"

import CancelButton from "../../../components/CancelButton"
import Confirm from "../../../components/Confirm"
import DeleteButton from "../../../components/DeleteButton"
import LoadingContainer from "../../../components/LoadingContainer"
import SubmitButton from "../../../components/SubmitButton"
import { EventPoints } from "../../../models/Events"
import {
	useAddEventPointsMutation,
	useRemoveEventPointsMutation,
	useUpdateEventPointsMutation,
} from "../eventsApi"
import { EventPointsEditProps } from "../eventsPropType"

const schema = yup.object({
	place: yup.number().required(),
	points: yup.number().required(),
})

const EventPointsEdit: React.FC<EventPointsEditProps> = (props) => {
	const { points, onClose } = props

	const [showConfirmation, setShowConfirmation] = useState(false)
	const [addPoints, { isLoading: isSaving }] = useAddEventPointsMutation()
	const [updatePoints, { isLoading: isUpdating }] = useUpdateEventPointsMutation()
	const [deletePoints, { isLoading: isDeleting }] = useRemoveEventPointsMutation()

	const isBusy = isSaving || isUpdating || isDeleting

	const handleConfirmDeleteCancel = () => {
		setShowConfirmation(false)
	}

	const handleDelete = async () => {
		setShowConfirmation(false)
		const data = points.prepJson()
		await deletePoints(data)
			.unwrap()
			.then(() => {
				toast.success(`${points.ordinalPlace} place has been removed.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	const handleSave = async (value: EventPoints) => {
		const data = value.prepJson()
		const mutation = value.id > 0 ? updatePoints(data) : addPoints(data)
		await mutation
			.unwrap()
			.then(() => {
				toast.success(`${value.place} place has been saved.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	return (
		<LoadingContainer loading={isBusy}>
			<Formik validationSchema={schema} onSubmit={handleSave} initialValues={points}>
				{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="points.place" className="mb-2">
							<Form.Label className="mb-0">Place</Form.Label>
							<Form.Control
								name="place"
								value={values.place?.toString()}
								isValid={touched.place && !errors.place}
								isInvalid={!!errors.place}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.place}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="points.points" className="mb-2">
							<Form.Label className="mb-0">Points</Form.Label>
							<Form.Control
								name="points"
								value={values.points?.toString()}
								isValid={touched.points && !errors.points}
								isInvalid={!!errors.points}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.points}</Form.Control.Feedback>
						</Form.Group>
						<SubmitButton />
						<DeleteButton canDelete={points.id !== 0} OnDelete={() => setShowConfirmation(true)} />
						<CancelButton canCancel={true} OnCancel={onClose} />
					</Form>
				)}
			</Formik>
			<Confirm
				show={showConfirmation}
				titleText="Delete Place/Points?"
				messageText="Please confirm that we should delete this place from the tournament."
				confirmText="Delete"
				DoCancel={handleConfirmDeleteCancel}
				DoConfirm={handleDelete}
			/>
		</LoadingContainer>
	)
}

export default EventPointsEdit
