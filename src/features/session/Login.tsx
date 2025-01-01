import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useNavigate } from "react-router"

import { useAppDispatch, useAppSelector } from "../../app-store"
import { getUser, login } from "../../store/UserStore"
import useSession from "../../utilities/SessionHooks"
import LoginForm, { ICredentials } from "./LoginForm"

const Login = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { location } = useAppSelector((state) => state.app)
	const { user, flags } = useSession()

	const init: ICredentials = {
		email: "",
		password: "",
		remember: true,
	}

	if (user.isAuthenticated) {
		navigate(location ?? "/account")
	}

	const handleLogin = async (credentials: ICredentials) => {
		await dispatch(login(credentials))
		await dispatch(getUser())
		if (user.isAuthenticated) {
			navigate(location ?? "/")
		}
	}

	return (
		<div className="m-5 p-5">
			<Card>
				<Card.Header>
					<Card.Title>Log in to MPGA.net</Card.Title>
				</Card.Header>
				<Card.Body>
					<LoginForm credentials={init} onLogin={(creds) => handleLogin(creds)} />
					{flags.hasError && <p className="text-danger">{flags.errorMessage}</p>}
				</Card.Body>
				<Card.Footer>
					<Button variant="outline-secondary" onClick={() => navigate("/account/forgot")}>
						Forgot Password
					</Button>
					<Button
						variant="outline-secondary"
						className="ms-2"
						onClick={() => navigate("/account/register")}
					>
						Register
					</Button>
				</Card.Footer>
			</Card>
		</div>
	)
}

export default Login
