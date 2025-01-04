import React from "react"

import { Formik } from "formik"
import Form from "react-bootstrap/Form"
import { toast } from "react-toastify"
import * as yup from "yup"

import constants from "../../app-constants"
import CancelButton from "../../components/CancelButton"
import LoadingContainer from "../../components/LoadingContainer"
import SubmitButton from "../../components/SubmitButton"
import { Club, Membership } from "../../models/Clubs"
import { useAddMembershipForClubMutation } from "./membershipApi"

type MembershipEditProps = {
	club: Club
	onCancel: () => void
	onSave: (data: Membership) => void
}

const schema = yup.object({
	paymentDate: yup.date().required(),
	paymentType: yup.string().required(),
	paymentCode: yup.string().nullable(),
	notes: yup.string().max(150).nullable(),
})

const MembershipEdit: React.FC<MembershipEditProps> = (props) => {
	const { club, onCancel, onSave } = props
	const [addMembershipForClub, { isLoading }] = useAddMembershipForClubMutation()

	const membership = new Membership({
		year: constants.CurrentYear,
		club: club.id,
		payment_type: "CK",
	})

	const handleSave = async (value: Membership) => {
		const data = value.prepJson()
		data.payment_date = data.payment_date.substring(0, 10)
		await addMembershipForClub(data)
			.unwrap()
			.then(() => {
				toast.success("Membership record has been created.")
				onSave(value)
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	return (
		<LoadingContainer loading={isLoading}>
			<Formik validationSchema={schema} onSubmit={handleSave} initialValues={membership}>
				{({ handleSubmit, setFieldValue, handleChange, handleBlur, values, touched, errors }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="paymentDate" className="mb-2">
							<Form.Label className="mb-0">Payment Date</Form.Label>
							<Form.Control
								name="paymentDate"
								type="date"
								value={values.paymentDate}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.paymentDate}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="paymentType" className="mb-2">
							<Form.Label className="mb-0">Payment Type</Form.Label>
							<Form.Control
								as="select"
								name="paymentType"
								value={values.paymentType}
								isValid={touched.paymentType && !errors.paymentType}
								isInvalid={!!errors.paymentType}
								onChange={handleChange}
								onBlur={handleBlur}
							>
								<option value="CK">Check</option>
								<option value="CA">Waived</option>
							</Form.Control>
							<Form.Control.Feedback type="invalid">{errors.paymentType}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="paymentCode" className="mb-2">
							<Form.Label className="mb-0">Check Number</Form.Label>
							<Form.Control
								name="paymentCode"
								value={values.paymentCode}
								isValid={touched.paymentCode && !errors.paymentCode}
								isInvalid={!!errors.paymentCode}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.paymentCode}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="cc.notes" className="mb-2">
							<Form.Label className="mb-0">Notes</Form.Label>
							<Form.Control
								name="notes"
								value={values.notes}
								isValid={touched.notes && !errors.notes}
								isInvalid={!!errors.notes}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.notes}</Form.Control.Feedback>
						</Form.Group>
						<SubmitButton />
						<CancelButton canCancel={true} OnCancel={onCancel} />
					</Form>
				)}
			</Formik>
		</LoadingContainer>
	)
}

export default MembershipEdit
