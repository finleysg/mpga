import React from "react"

import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useNavigate, useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../app-store"
import Loading from "../../components/Loading"
import { confirmPasswordReset } from "../../store/UserStore"
import PasswordResetForm, { IPasswordReset } from "./PasswordResetForm"

const PasswordReset: React.FC = () => {
	const { uid, token } = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const session = useAppSelector((state) => state.session)

	const resetPassword = (credentials: IPasswordReset) => {
		const confirm = { uid: uid || "", token: token || "", new_password: credentials.password }
		dispatch(confirmPasswordReset(confirm))
	}

	return (
		<div>
			{session.flags.isBusy && <Loading />}
			<Card>
				<Card.Header>
					<Card.Title>Create or Reset Your Password</Card.Title>
				</Card.Header>
				<Card.Body>
					{!session.flags.passwordResetConfirmed && <p>Enter and confirm your new password.</p>}
					{session.flags.passwordResetConfirmed && (
						<p className="text-success">
							Your password has been changed. Log in now with your new password.
						</p>
					)}
					<PasswordResetForm OnReset={(creds) => resetPassword(creds)} />
					{session.flags.hasError && (
						<p className="text-danger mt-3">{session.flags.errorMessage}</p>
					)}
				</Card.Body>
				{session.flags.passwordResetConfirmed && (
					<Card.Footer>
						<Button variant="outline-secondary" onClick={() => navigate("/account/login")}>
							Login
						</Button>
					</Card.Footer>
				)}
			</Card>
		</div>
	)
}

export default PasswordReset
