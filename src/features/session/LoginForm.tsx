import React from "react"

import { Formik } from "formik"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import * as yup from "yup"

import useSession from "../../utilities/SessionHooks"

export interface ICredentials {
	email: string
	password: string
	remember: boolean
}

export interface LoginFormProps {
	credentials: ICredentials
	onLogin: (credentials: ICredentials) => void
}

const schema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required(),
	remember: yup.boolean(),
})

const LoginForm = ({ credentials, onLogin }: LoginFormProps) => {
	const { flags } = useSession()

	return (
		<Formik
			validationSchema={schema}
			validateOnBlur={false}
			validateOnChange={false}
			onSubmit={(values) => {
				onLogin(values)
			}}
			initialValues={credentials}
		>
			{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
				<Form noValidate onSubmit={handleSubmit}>
					<Form.Group controlId="login.email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							placeholder="email"
							name="email"
							type="email"
							value={values.email}
							isValid={touched.email && !errors.email}
							isInvalid={!!errors.email}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mt-4" controlId="login.password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							placeholder="password"
							name="password"
							type="password"
							value={values.password}
							isValid={touched.password && !errors.password}
							isInvalid={!!errors.password}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mt-4" controlId="loginremember">
						<Form.Check
							defaultChecked={values.remember}
							onChange={handleChange}
							label="Remember me on this device"
						/>
					</Form.Group>
					<Button variant="secondary" type="submit" className="mt-4" disabled={flags.isBusy}>
						Login
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default LoginForm
