import React from "react"

import { Formik } from "formik"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Spinner from "react-bootstrap/Spinner"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import styled from "styled-components"
import * as yup from "yup"

import { useAppDispatch } from "../../app-store"
import { IApplicationState } from "../../store"
import { sendMessage } from "../../store/MessageStore"

const ContactFormContainer = styled.div`
	border: 1px solid silver;
	background-color: #eeeeee;
	border-radius: 4px;
	padding: 10px;
	margin: 20px 0;
`
ContactFormContainer.displayName = "ContactFormContainer"

const schema = yup.object({
	course: yup.string().required(),
	contact_name: yup.string().required(),
	contact_email: yup.string().email().required(),
	contact_phone: yup.string().nullable(),
	message: yup.string().required(),
})

const initialValues = {
	course: "",
	contact_name: "",
	contact_email: "",
	contact_phone: "",
	message: "",
}

const ContactForm = () => {
	const dispatch = useAppDispatch()
	const state = useSelector((state: IApplicationState) => state.messaging)
	const navigate = useNavigate()

	const handleSendMessage = async (values: any) => {
		await dispatch(sendMessage(values))
		if (!state.failed) {
			toast.success("Your message has been sent. Thank you!")
			navigate("/")
		}
	}

	return (
		<React.Fragment>
			<ContactFormContainer>
				<Formik
					validationSchema={schema}
					onSubmit={(values) => {
						handleSendMessage(values)
					}}
					initialValues={initialValues}
				>
					{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
						<Form noValidate onSubmit={handleSubmit}>
							<Form.Group className="mb-2">
								<Form.Control
									placeholder="Name"
									id="contact_name"
									name="contact_name"
									value={values.contact_name}
									isValid={touched.contact_name && !errors.contact_name}
									isInvalid={!!errors.contact_name}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<Form.Control.Feedback type="invalid">{errors.contact_name}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-2">
								<Form.Control
									placeholder="Email"
									id="contact_email"
									name="contact_email"
									value={values.contact_email}
									isValid={touched.contact_email && !errors.contact_email}
									isInvalid={!!errors.contact_email}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<Form.Control.Feedback type="invalid">{errors.contact_email}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-2">
								<Form.Control
									placeholder="Phone number"
									id="contact_phone"
									name="contact_phone"
									value={values.contact_phone}
									isValid={touched.contact_phone && !errors.contact_phone}
									isInvalid={!!errors.contact_phone}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<Form.Control.Feedback type="invalid">{errors.contact_phone}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-2">
								<Form.Control
									placeholder="Home course"
									id="course"
									name="course"
									value={values.course}
									isValid={touched.course && !errors.course}
									isInvalid={!!errors.course}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<Form.Control.Feedback type="invalid">{errors.course}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-2">
								<Form.Control
									as="textarea"
									placeholder="Enter your message here"
									rows={6}
									id="message"
									name="message"
									value={values.message}
									isValid={touched.message && !errors.message}
									isInvalid={!!errors.message}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
							</Form.Group>
							<Button
								variant="secondary"
								type="submit"
								size="sm"
								disabled={state.sending || state.sent}
							>
								{state.sending && (
									<Spinner
										as="div"
										animation="border"
										variant="primary"
										size="sm"
										role="status"
										className="me-2"
									>
										<span className="visually-hidden">Sending...</span>
									</Spinner>
								)}
								Send
							</Button>
						</Form>
					)}
				</Formik>
			</ContactFormContainer>
			{state.failed && (
				<p className="text-danger mt-2">
					Something went wrong and your message was not sent. You can try again, or contact the MPGA
					directly at secretary@mpga.net.
				</p>
			)}
		</React.Fragment>
	)
}

export default ContactForm
