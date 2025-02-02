import React from "react"

import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useNavigate } from "react-router"

import { useAppDispatch, useAppSelector } from "../../app-store"
import Loading from "../../components/Loading"
import { IApplicationState } from "../../store"
import { createAccount, IRegisterData } from "../../store/UserStore"
import RegisterForm from "./RegisterForm"

const Register: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const session = useAppSelector((state: IApplicationState) => state.session)

	const register = (registrationData: IRegisterData) => {
		dispatch(createAccount(registrationData))
	}

	return (
		<div>
			{session.flags.isBusy && <Loading />}
			<Card>
				<Card.Header>
					<Card.Title>Sign Up for an Account</Card.Title>
				</Card.Header>
				<Card.Body>
					<p className="text-info">
						It is possible that we already have an account for you in our system. This is because we
						automatically create accounts for officers or contacts for our member clubs. If that is
						the case, you will get a message below when you try to create your account.
					</p>
					<RegisterForm OnRegister={(registration) => register(registration)} />
					{session.flags.hasError && (
						<p className="text-danger mt-3">{session.flags.errorMessage}</p>
					)}
					{session.flags.accountExists && (
						<p className="text-danger mt-3">
							Please create a password for your account by clicking the Reset Password button below.
						</p>
					)}
					{session.flags.accountCreated && (
						<p className="text-success mt-3">
							Your account has been created, but not yet activated. We have sent an email to your
							email address above for confirmation. If you do not receive that email, please confirm
							that your email client is not blocking mpga.net as junk or spam.
						</p>
					)}
				</Card.Body>
				<Card.Footer>
					<Button variant="outline-secondary" onClick={() => navigate("/account/login")}>
						Login
					</Button>
					{session.flags.accountExists && (
						<Button
							variant="outline-secondary"
							className="ml-2"
							onClick={() => navigate("/account/forgot")}
						>
							Reset Password
						</Button>
					)}
				</Card.Footer>
			</Card>
		</div>
	)
}

export default Register
