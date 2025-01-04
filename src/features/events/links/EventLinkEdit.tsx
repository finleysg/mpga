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
import { EventLink } from "../../../models/Events"
import {
	useAddEventLinkMutation,
	useRemoveEventLinkMutation,
	useUpdateEventLinkMutation,
} from "../eventsApi"
import { EventLinkEditProps } from "../eventsPropType"

const schema = yup.object({
	title: yup.string().max(60).required(),
	linkType: yup.string().required(),
	url: yup.string().max(240).url().required(),
})

const EventLinkEdit: React.FC<EventLinkEditProps> = (props) => {
	const { eventLink, onClose } = props

	const [showConfirmation, setShowConfirmation] = useState(false)
	const [addEventLink, { isLoading: isSaving }] = useAddEventLinkMutation()
	const [updateEventLink, { isLoading: isUpdating }] = useUpdateEventLinkMutation()
	const [removeEventLink, { isLoading: isDeleting }] = useRemoveEventLinkMutation()

	const isBusy = isSaving || isUpdating || isDeleting

	const handleConfirmDeleteCancel = () => {
		setShowConfirmation(false)
	}

	const handleDelete = async () => {
		setShowConfirmation(false)
		const data = eventLink.prepJson()
		await removeEventLink(data)
			.unwrap()
			.then(() => {
				toast.success(`${eventLink.title} has been removed.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	const handleSave = async (value: EventLink) => {
		const data = value.prepJson()
		const mutation = value.id > 0 ? updateEventLink(data) : addEventLink(data)
		await mutation
			.unwrap()
			.then(() => {
				toast.success(`${value.title} has been saved.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	return (
		<LoadingContainer loading={isBusy}>
			<Formik validationSchema={schema} onSubmit={handleSave} initialValues={eventLink}>
				{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="eventLink.title" className="mb-2">
							<Form.Label className="full-width mb-0">Title</Form.Label>
							<Form.Control
								placeholder="Title"
								name="title"
								value={values.title}
								isValid={touched.title && !errors.title}
								isInvalid={!!errors.title}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
							<Form.Text className="text-muted">Display name for this link.</Form.Text>
						</Form.Group>
						<Form.Group controlId="doc.LinkType" className="mb-2">
							<Form.Label className="mb-0">Link type</Form.Label>
							<Form.Control
								as="select"
								name="linkType"
								value={values.linkType}
								isValid={touched.linkType && !errors.linkType}
								isInvalid={!!errors.linkType}
								onChange={handleChange}
								onBlur={handleBlur}
							>
								<option value=""></option>
								<option value="Media">Media</option>
								<option value="Registration">Registration</option>
								<option value="Results">Results</option>
								<option value="Tee Times">Tee Times</option>
							</Form.Control>
						</Form.Group>
						<Form.Group controlId="eventLink.url" className="mb-2">
							<Form.Label className="full-width mb-0">Url</Form.Label>
							<Form.Control
								placeholder="https://link-to-somewhere"
								name="url"
								value={values.url}
								isValid={touched.url && !errors.url}
								isInvalid={!!errors.url}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.url}</Form.Control.Feedback>
							<Form.Text className="text-muted">Url for the link</Form.Text>
						</Form.Group>
						<SubmitButton />
						<DeleteButton
							canDelete={eventLink.id !== 0}
							OnDelete={() => setShowConfirmation(true)}
						/>
						<CancelButton canCancel={true} OnCancel={onClose} />
					</Form>
				)}
			</Formik>
			<Confirm
				show={showConfirmation}
				titleText="Delete Link?"
				messageText="Please confirm that we should delete this link."
				confirmText="Delete Link"
				DoCancel={handleConfirmDeleteCancel}
				DoConfirm={handleDelete}
			/>
		</LoadingContainer>
	)
}

export default EventLinkEdit
