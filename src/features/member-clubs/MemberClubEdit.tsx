import { Formik } from "formik"
import Form from "react-bootstrap/Form"
import { toast } from "react-toastify"
import * as yup from "yup"

import CancelButton from "../../components/CancelButton"
import LoadingContainer from "../../components/LoadingContainer"
import { MarkdownField } from "../../components/MarkdownField"
import SubmitButton from "../../components/SubmitButton"
import { Club } from "../../models/Clubs"
import { useUpdateClubMutation } from "./memberClubApi"
import { MemberClubEditProps } from "./memberClubPropTypes"

const schema = yup.object({
	name: yup.string().max(200).required(),
	website: yup.string().max(300).url(),
	size: yup.number(),
	notes: yup.string(),
})

const MemberClubEdit = (props: MemberClubEditProps) => {
	const { club, onClose } = props

	const [updateClub, { isLoading }] = useUpdateClubMutation()

	const handleSave = async (value: Club) => {
		const data = value.prepJson()
		data.id = club.id
		await updateClub(data)
			.unwrap()
			.then(() => {
				toast.success("Your changes have been saved.")
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	return (
		<LoadingContainer loading={isLoading}>
			<Formik validationSchema={schema} onSubmit={handleSave} initialValues={club}>
				{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="club.Name" className="mb-2">
							<Form.Label className="mb-0">Name</Form.Label>
							<Form.Control
								name="name"
								placeholder="Official club name"
								value={values.name}
								isValid={touched.name && !errors.name}
								isInvalid={!!errors.name}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="club.Website" className="mb-2">
							<Form.Label className="mb-0">Website</Form.Label>
							<Form.Control
								name="website"
								placeholder="Website"
								value={values.website}
								isValid={touched.website && !errors.website}
								isInvalid={!!errors.website}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.website}</Form.Control.Feedback>
							<Form.Text className="text-muted">Full url, included protocol (http/https)</Form.Text>
						</Form.Group>
						<Form.Group controlId="club.Size" className="mb-2">
							<Form.Label className="mb-0">Club size</Form.Label>
							<Form.Control
								name="size"
								value={values.size?.toString()}
								isValid={touched.size && !errors.size}
								isInvalid={!!errors.size}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.size}</Form.Control.Feedback>
							<Form.Text className="text-muted">Current number of members.</Form.Text>
						</Form.Group>
						<Form.Group controlId="club.Notes" className="mb-2">
							<Form.Label className="mb-0">Notes</Form.Label>
							<MarkdownField name="notes" value={values.notes} height="360px" />
						</Form.Group>
						<SubmitButton />
						<CancelButton OnCancel={onClose} canCancel={true} />
					</Form>
				)}
			</Formik>
		</LoadingContainer>
	)
}

export default MemberClubEdit
