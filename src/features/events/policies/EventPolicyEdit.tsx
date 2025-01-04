import React, { useState } from "react"

import { Formik } from "formik"
import Form from "react-bootstrap/Form"
import { toast } from "react-toastify"
import * as yup from "yup"

import CancelButton from "../../../components/CancelButton"
import Confirm from "../../../components/Confirm"
import DeleteButton from "../../../components/DeleteButton"
import LoadingContainer from "../../../components/LoadingContainer"
import { MarkdownField } from "../../../components/MarkdownField"
import SubmitButton from "../../../components/SubmitButton"
import { Policy } from "../../../models/Policies"
import { useRemoveEventPolicyMutation, useUpdateEventPolicyMutation } from "../eventsApi"
import { EventPolicyEditProps } from "../eventsPropType"

const schema = yup.object({
	name: yup.string().max(30).required(),
	title: yup.string().max(120).required(),
	description: yup.string().required(),
})

const EventPolicyEdit: React.FC<EventPolicyEditProps> = (props) => {
	const { policy, onClose } = props

	const [showConfirmation, setShowConfirmation] = useState(false)
	const localPolicy = policy.policy

	const [updatePolicy, { isLoading: isUpdating }] = useUpdateEventPolicyMutation()
	const [deletePolicy, { isLoading: isDeleting }] = useRemoveEventPolicyMutation()

	const isBusy = isUpdating || isDeleting

	const handleConfirmDeleteCancel = () => {
		setShowConfirmation(false)
	}

	const handleDelete = async () => {
		setShowConfirmation(false)
		const data = policy.prepJson()
		await deletePolicy(data)
			.unwrap()
			.then(() => {
				toast.success(`${policy.policy.name} has been removed from this event.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	const handleSave = async (value: Policy) => {
		const data = policy.prepJson()
		data.policy = value.prepJson()
		await updatePolicy(data)
			.unwrap()
			.then(() => {
				toast.success(`Policy ${value.name} has been saved.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	return (
		<LoadingContainer loading={isBusy}>
			{policy.id > 0 && (
				<p className="text-muted">
					Policies are typically shared between tournaments, so changes to this policy will be
					reflected in elsewhere. If you need a policy unique to this event, contact the website
					administrator (Stuart).
				</p>
			)}
			<Formik validationSchema={schema} onSubmit={handleSave} initialValues={localPolicy}>
				{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="policy.Name" className="mb-2">
							<Form.Label className="mb-0">Name</Form.Label>
							<Form.Control
								name="name"
								placeholder="Unique policy name"
								value={values.name}
								isValid={touched.name && !errors.name}
								isInvalid={!!errors.name}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
							<Form.Text className="text-muted">
								This name is not displayed on the website
							</Form.Text>
						</Form.Group>
						<Form.Group controlId="policy.Title" className="mb-2">
							<Form.Label className="mb-0">Title</Form.Label>
							<Form.Control
								name="title"
								placeholder="Title"
								value={values.title}
								isValid={touched.title && !errors.title}
								isInvalid={!!errors.title}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="policy.Description" className="mb-2">
							<Form.Label className="mb-0">Policy text</Form.Label>
							<MarkdownField name="description" value={values.description} height="240px" />
						</Form.Group>
						<SubmitButton />
						<DeleteButton canDelete={policy.id !== 0} OnDelete={() => setShowConfirmation(true)} />
						<CancelButton canCancel={true} OnCancel={onClose} />
					</Form>
				)}
			</Formik>
			<Confirm
				show={showConfirmation}
				titleText="Remove Policy?"
				messageText="Please confirm that we should remove this policy from the tournament."
				confirmText="Remove Policy"
				DoCancel={handleConfirmDeleteCancel}
				DoConfirm={handleDelete}
			/>
		</LoadingContainer>
	)
}

export default EventPolicyEdit
