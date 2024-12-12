import React, { useEffect } from "react"

import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useNavigate, useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../app-store"
import Loading from "../../components/Loading"
import { activateAccount } from "../../store/UserStore"

const AccountActivation: React.FC = () => {
	const { uid, token } = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const session = useAppSelector((state) => state.session)

	useEffect(() => {
		if (uid && token) {
			dispatch(activateAccount({ uid, token }))
		}
	}, [dispatch, uid, token])

	return (
		<div>
			{session.flags.isBusy && <Loading />}
			<Card>
				<Card.Header>
					<Card.Title>Account Activation Status</Card.Title>
				</Card.Header>
				<Card.Body>
					{session.flags.accountActivated && (
						<p className="text-success mt-1">
							Your account has been confirmed and activated. Log in now with your new password.
							Thank you for supporting Minnesota Public Golf!
						</p>
					)}
					{session.flags.hasError && (
						<p className="text-danger mt-1">{session.flags.errorMessage}</p>
					)}
				</Card.Body>
				{session.flags.accountActivated && (
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

export default AccountActivation
