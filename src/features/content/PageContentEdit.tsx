import React from "react"

import { Formik } from "formik"
import Form from "react-bootstrap/Form"
import { toast } from "react-toastify"
import * as yup from "yup"

import CancelButton from "../../components/CancelButton"
import { MarkdownField } from "../../components/MarkdownField"
import { OverlaySpinner } from "../../components/Spinner"
import SubmitButton from "../../components/SubmitButton"
import { PageContent } from "../../models/Policies"
import { useUpdatePageContentMutation } from "./contentApi"
import { PageContentEditProps } from "./contentPropTypes"

const schema = yup.object({
	title: yup.string().max(120).required(),
	// content: yup.string().required(),
})

const PageContentEdit: React.FC<PageContentEditProps> = (props) => {
	const { pageContent, onClose } = props

	const [updatePageContent, { isLoading }] = useUpdatePageContentMutation()

	const handleSave = async (value: PageContent) => {
		const data = value.prepJson()
		await updatePageContent(data)
			.unwrap()
			.then(() => {
				toast.success(`${pageContent.title} has been saved.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	return (
		<div>
			<OverlaySpinner loading={isLoading} />
			<Formik validationSchema={schema} onSubmit={handleSave} initialValues={pageContent}>
				{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="title" className="mb-2">
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
						<Form.Group controlId="description" className="mb-2">
							<Form.Label className="mb-0 text-muted">Text</Form.Label>
							<MarkdownField name="content" value={values.content} height="300px" />
						</Form.Group>
						<SubmitButton />
						<CancelButton canCancel={true} OnCancel={onClose} />
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default PageContentEdit
