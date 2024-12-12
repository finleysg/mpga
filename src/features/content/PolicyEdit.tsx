import React, { useState } from "react"

import { Formik } from "formik"
import Form from "react-bootstrap/Form"
import { toast } from "react-toastify"
import * as yup from "yup"

import CancelButton from "../../components/CancelButton"
import Confirm from "../../components/Confirm"
import DeleteButton from "../../components/DeleteButton"
import { MarkdownField } from "../../components/MarkdownField"
import { OverlaySpinner } from "../../components/Spinner"
import SubmitButton from "../../components/SubmitButton"
import { Policy } from "../../models/Policies"
import { shorten, slugify } from "../../utilities/Content"
import {
	useAddPolicyMutation,
	useDeletePolicyMutation,
	useUpdatePolicyMutation,
} from "./contentApi"
import { PolicyEditProps } from "./contentPropTypes"

const schema = yup.object({
	title: yup.string().max(120).required(),
	description: yup.string().required(),
})

const PolicyEdit: React.FC<PolicyEditProps> = (props) => {
	const { policy, onClose } = props
	const [showConfirmation, setShowConfirmation] = useState(false)
	const [addPolicy, { isLoading: isSaving }] = useAddPolicyMutation()
	const [updatePolicy, { isLoading: isUpdating }] = useUpdatePolicyMutation()
	const [deletePolicy, { isLoading: isDeleting }] = useDeletePolicyMutation()

	const isBusy = isSaving || isUpdating || isDeleting

	const handleConfirmDeleteCancel = () => {
		setShowConfirmation(false)
	}

	const handleConfirmDeleteContinue = async () => {
		setShowConfirmation(false)
		const data = policy.prepJson()
		await deletePolicy(data)
			.unwrap()
			.then(() => {
				toast.success(`${policy.name} has been removed.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	const handleSave = async (policy: Policy) => {
		policy.name = shorten(slugify(policy.title), 30)
		const data = policy.prepJson()
		const mutation = data.id > 0 ? updatePolicy(data) : addPolicy(data)
		await mutation
			.unwrap()
			.then(() => {
				toast.success(`${policy.name} has been saved.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + JSON.stringify(error))
			})
	}

	return (
		<div>
			<OverlaySpinner loading={isBusy} />
			<Formik validationSchema={schema} onSubmit={handleSave} initialValues={policy}>
				{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="policy.Title" className="mb-2">
							<Form.Label className="mb-0 text-muted">Title</Form.Label>
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
							<Form.Label className="mb-0 text-muted">Text</Form.Label>
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
				titleText="Delete Policy?"
				messageText="Please confirm that we should delete this policy."
				confirmText="Delete Policy"
				DoCancel={handleConfirmDeleteCancel}
				DoConfirm={handleConfirmDeleteContinue}
			/>
		</div>
	)
}

export default PolicyEdit
