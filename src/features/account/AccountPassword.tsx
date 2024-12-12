import React, { useState } from "react"

import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import styled from "styled-components"

import { useAppDispatch } from "../../app-store"
import { changePassword } from "../../store/UserStore"
import ChangePasswordForm, { IPasswordChange } from "./ChangePasswordForm"

export const EditAccountContainer = styled.div`
	border-width: 1px;
	border-color: teal;
	border-style: solid;
	padding: 10px;
	margin-bottom: 10px;
`
EditAccountContainer.displayName = "EditAccountContainer"

const AccountPassword: React.FC = () => {
	const [doEdit, setDoEdit] = useState(false)
	const dispatch = useAppDispatch()

	const handleChangePassword = (credentials: IPasswordChange) => {
		dispatch(
			changePassword({
				password: credentials.currentPassword,
				new_password: credentials.newPassword,
				re_new_password: credentials.confirmPassword,
			}),
		)
		setDoEdit(false)
	}

	return (
		<div>
			<Row>
				<Col xs={3}>Password</Col>
				<Col xs={8}>********</Col>
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
							<ChangePasswordForm OnChange={(creds) => handleChangePassword(creds)} />
						</EditAccountContainer>
					</Col>
				</Row>
			)}
		</div>
	)
}

export default AccountPassword
