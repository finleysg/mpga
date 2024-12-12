import React from "react"

import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"

import { useAppDispatch } from "../../app-store"
import { IContactData } from "../../services/Data"
import { saveContact } from "../../store/UserStore"
import useSession from "../../utilities/SessionHooks"

const AccountContact: React.FC = () => {
	const { contact } = useSession()
	const dispatch = useAppDispatch()

	const updateContact = (event: any) => {
		console.log(event)
		contact.sendEmail = event.target.checked
		dispatch(saveContact(contact.prepJson() as IContactData))
	}

	return (
		<div>
			<Row>
				<Col xs={12}>
					<Form.Check
						name="sendEmail"
						checked={contact?.sendEmail}
						label="Send me newsletters and tournament updates."
						onChange={(e: any) => updateContact(e)}
					/>
					<p className="text-muted">
						The MPGA will never share you email address with any other organization. The setting
						above is strictly for communications from us that may be of interest to our players and
						member clubs.
					</p>
				</Col>
			</Row>
		</div>
	)
}

export default AccountContact
