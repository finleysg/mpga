import React, { useState } from "react"

import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import { useAppDispatch } from "../../app-store"
import { updateAccount } from "../../store/UserStore"
import useSession from "../../utilities/SessionHooks"
import { EditAccountContainer } from "./AccountPassword"
import ChangeEmailForm from "./ChangeEmailForm"

const AccountEmail: React.FC = () => {
	const [doEdit, setDoEdit] = useState(false)
	const dispatch = useAppDispatch()
	const { user } = useSession()

	const changeEmail = (email: string) => {
		dispatch(updateAccount({ email: email }))
		setDoEdit(false)
	}

	return (
		<div>
			<Row>
				<Col xs={3}>Email</Col>
				<Col xs={8}>{user.email}</Col>
				<Col xs={1}>
					<Button variant="link" className="text-info" onClick={() => setDoEdit(!doEdit)}>
						{doEdit ? "cancel" : "change"}
					</Button>
				</Col>
			</Row>
			{doEdit && (
				<Row>
					<Col xs={12}>
						<EditAccountContainer>
							<ChangeEmailForm email={user.email} OnChange={(email) => changeEmail(email)} />
						</EditAccountContainer>
					</Col>
				</Row>
			)}
		</div>
	)
}

export default AccountEmail
