import React, { useState } from "react"

import { Formik } from "formik"
import Form from "react-bootstrap/Form"
import { toast } from "react-toastify"
import * as yup from "yup"

import CancelButton from "../../components/CancelButton"
import Confirm from "../../components/Confirm"
import DeleteButton from "../../components/DeleteButton"
import LoadingContainer from "../../components/LoadingContainer"
import SubmitButton from "../../components/SubmitButton"
import { Contact, ExecutiveCommittee } from "../../models/Clubs"
import { useGetClubsQuery } from "../member-clubs/memberClubApi"
import {
	useAddCommitteeMutation,
	useDeleteCommitteeMutation,
	useUpdateCommitteeMutation,
} from "./committeeApi"
import { ExecutiveCommitteeEditProps } from "./committeePropTypes"

export interface IExecutiveCommitteeData {
	firstName: string
	lastName: string
	primaryPhone?: string
	alternatePhone?: string
	email: string
	addressTxt?: string
	city?: string
	state?: string
	zip?: string
	notes?: string
	role?: string
	homeClub?: number
}

// const phoneRegEx = /^[2-9]\d{2}-\d{3}-\d{4}$/;
const schema = yup.object({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup.string().email().required(),
	primaryPhone: yup.string().required(),
	addressTxt: yup.string().nullable(),
	city: yup.string().nullable(),
	state: yup.string().nullable(),
	zip: yup.string().nullable(),
	role: yup.string().required(),
	homeClub: yup.number().required(),
})

const translateExecutiveCommittee = (ec: ExecutiveCommittee): IExecutiveCommitteeData => {
	const contact = ec.contact || new Contact({})
	return {
		firstName: contact.firstName,
		lastName: contact.lastName,
		primaryPhone: contact.primaryPhone,
		alternatePhone: contact.alternatePhone,
		email: contact.email,
		addressTxt: contact.addressTxt,
		city: contact.city,
		state: contact.state,
		zip: contact.zip,
		notes: contact.notes,
		role: ec.role,
		homeClub: ec.homeClub,
	}
}

const CommitteeMemberEdit: React.FC<ExecutiveCommitteeEditProps> = (props) => {
	const { committeeMember, onClose } = props

	const { data: clubs, isLoading } = useGetClubsQuery()
	const [addCommittee, { isLoading: isSaving }] = useAddCommitteeMutation()
	const [updateCommittee, { isLoading: isUpdating }] = useUpdateCommitteeMutation()
	const [deleteCommittee, { isLoading: isDeleting }] = useDeleteCommitteeMutation()
	const ec = translateExecutiveCommittee(committeeMember)
	const [showConfirmation, setShowConfirmation] = useState(false)

	const isBusy = isLoading || isSaving || isUpdating || isDeleting

	const handleConfirmDeleteCancel = () => {
		setShowConfirmation(false)
	}

	const handleConfirmDeleteContinue = async () => {
		setShowConfirmation(false)
		const data = committeeMember.prepJson()
		await deleteCommittee(data)
			.unwrap()
			.then(() => {
				toast.success(`${committeeMember.contact.name} has been removed.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	const handleSave = async (id: number, updatedMember: IExecutiveCommitteeData) => {
		const member = ExecutiveCommittee.Create(updatedMember)
		member.id = id
		const data = member.toJson()
		const mutation = data.id > 0 ? updateCommittee(data) : addCommittee(data)
		await mutation
			.unwrap()
			.then(() => {
				toast.success(`${updatedMember.firstName} ${updatedMember.lastName} has been saved.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	return (
		<LoadingContainer loading={isBusy}>
			<Formik
				validationSchema={schema}
				onSubmit={(values, actions) => {
					actions.setSubmitting(false)
					handleSave(committeeMember.id || 0, values)
				}}
				initialValues={ec}
			>
				{({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="ec.firstName" className="mb-2">
							<Form.Label className="mb-0">First name</Form.Label>
							<Form.Control
								placeholder="First name"
								name="firstName"
								value={values.firstName}
								isValid={touched.firstName && !errors.firstName}
								isInvalid={!!errors.firstName}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="ec.lastName" className="mb-2">
							<Form.Label className="mb-0">Last name</Form.Label>
							<Form.Control
								placeholder="Last name"
								name="lastName"
								value={values.lastName}
								isValid={touched.lastName && !errors.lastName}
								isInvalid={!!errors.lastName}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="ec.email" className="mb-2">
							<Form.Label className="mb-0">Email</Form.Label>
							<Form.Control
								placeholder="Email"
								name="email"
								value={values.email}
								isValid={touched.email && !errors.email}
								isInvalid={!!errors.email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="ec.primaryPhone" className="mb-2">
							<Form.Label className="mb-0">Primary phone</Form.Label>
							<Form.Control
								placeholder="xxx-xxx-xxxx"
								name="primaryPhone"
								value={values.primaryPhone}
								isValid={touched.primaryPhone && !errors.primaryPhone}
								isInvalid={!!errors.primaryPhone}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.primaryPhone}</Form.Control.Feedback>
							<Form.Text className="text-muted">Format: xxx-xxx-xxxx</Form.Text>
						</Form.Group>
						<Form.Group controlId="ec.role" className="mb-2">
							<Form.Label className="mb-0">Role</Form.Label>
							<Form.Control
								as="select"
								name="role"
								value={values.role}
								isValid={touched.role && !errors.role}
								isInvalid={!!errors.role}
								onChange={handleChange}
								onBlur={handleBlur}
							>
								<option value={undefined}>--Select a Role--</option>
								<option value="At Large">At Large</option>
								<option value="President">President</option>
								<option value="Vice President">Vice President</option>
								<option value="Secretary">Secretary</option>
								<option value="Treasurer">Treasurer</option>
								<option value="MGA Public Golf Manager">MGA Public Golf Manager</option>
								<option value="Immediate Past President">Immediate Past President</option>
							</Form.Control>
							<Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="ec.homeClub" className="mb-2">
							<Form.Label className="mb-0">Home club</Form.Label>
							<Form.Control
								as="select"
								name="homeClub"
								value={values.homeClub?.toString()}
								isValid={touched.homeClub && !errors.homeClub}
								isInvalid={!!errors.homeClub}
								onChange={handleChange}
								onBlur={handleBlur}
							>
								<option value={undefined}>--Select a Home Club--</option>
								{clubs?.map((c) => {
									return (
										<option key={c.id} value={c.id}>
											{c.name}
										</option>
									)
								})}
							</Form.Control>
							<Form.Control.Feedback type="invalid">{errors.homeClub}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="ec.addressTxt" className="mb-2">
							<Form.Label className="mb-0">Address</Form.Label>
							<Form.Control
								placeholder="Street address"
								name="addressTxt"
								value={values.addressTxt}
								isValid={touched.addressTxt && !errors.addressTxt}
								isInvalid={!!errors.addressTxt}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.addressTxt}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="ec.city" className="mb-2">
							<Form.Label className="mb-0">City</Form.Label>
							<Form.Control
								placeholder="City"
								name="city"
								value={values.city}
								isValid={touched.city && !errors.city}
								isInvalid={!!errors.city}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="ec.state" className="mb-2">
							<Form.Label className="mb-0">State</Form.Label>
							<Form.Control
								placeholder="State"
								name="state"
								value={values.state}
								isValid={touched.state && !errors.state}
								isInvalid={!!errors.state}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
							<Form.Text className="text-muted">Two-letter state code (MN, WI, etc.)</Form.Text>
						</Form.Group>
						<Form.Group controlId="ec.zip" className="mb-2">
							<Form.Label className="mb-0">Zip code</Form.Label>
							<Form.Control
								placeholder="Zip code"
								name="zip"
								value={values.zip}
								isValid={touched.zip && !errors.zip}
								isInvalid={!!errors.zip}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
						</Form.Group>
						<SubmitButton />
						<DeleteButton
							canDelete={committeeMember.id! > 0}
							title="Remove"
							OnDelete={() => setShowConfirmation(true)}
						/>
						<CancelButton canCancel={true} OnCancel={onClose} />
					</Form>
				)}
			</Formik>
			<Confirm
				show={showConfirmation}
				titleText="Remove Committee Member?"
				messageText="Please confirm that we should remove this contact from the executive committee."
				confirmText="Remove"
				DoCancel={handleConfirmDeleteCancel}
				DoConfirm={handleConfirmDeleteContinue}
			/>
		</LoadingContainer>
	)
}

export default CommitteeMemberEdit
