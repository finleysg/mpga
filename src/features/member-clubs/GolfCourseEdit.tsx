import { Formik } from "formik"
import Form from "react-bootstrap/Form"
import { toast } from "react-toastify"
import * as yup from "yup"

import CancelButton from "../../components/CancelButton"
import LoadingContainer from "../../components/LoadingContainer"
import SubmitButton from "../../components/SubmitButton"
import { GolfCourse } from "../../models/Clubs"
import { useUpdateCourseMutation } from "./memberClubApi"
import { GolfCourseEditProps } from "./memberClubPropTypes"

const schema = yup.object({
	name: yup.string().required(),
	addressTxt: yup.string().required(),
	city: yup.string().required(),
	state: yup.string().required(),
	zip: yup.string().required(),
	website: yup.string().url().nullable(),
	email: yup.string().email().nullable(),
	phone: yup.string().nullable(),
})

const GolfCourseEdit = (props: GolfCourseEditProps) => {
	const { club, onClose } = props

	const [updateCourse, { isLoading }] = useUpdateCourseMutation()

	const handleSave = async (value: GolfCourse) => {
		const data = club.prepJson()
		data.id = club.id
		data.golf_course = value.prepJson()
		await updateCourse(data)
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
			<Formik validationSchema={schema} onSubmit={handleSave} initialValues={club.golfCourse}>
				{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="name" className="mb-2">
							<Form.Label className="mb-0">Name</Form.Label>
							<Form.Control
								name="name"
								placeholder="Golf course name"
								value={values.name}
								isValid={touched.name && !errors.name}
								isInvalid={!!errors.name}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="addressTxt" className="mb-2">
							<Form.Label className="mb-0">Address</Form.Label>
							<Form.Control
								name="addressTxt"
								placeholder="Street address"
								value={values.addressTxt}
								isValid={touched.addressTxt && !errors.addressTxt}
								isInvalid={!!errors.addressTxt}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.addressTxt}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="city" className="mb-2">
							<Form.Label className="mb-0">City</Form.Label>
							<Form.Control
								name="city"
								placeholder="City"
								value={values.city}
								isValid={touched.city && !errors.city}
								isInvalid={!!errors.city}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="state" className="mb-2">
							<Form.Label className="mb-0">State</Form.Label>
							<Form.Control
								name="state"
								placeholder="State"
								value={values.state}
								isValid={touched.state && !errors.state}
								isInvalid={!!errors.state}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="zip" className="mb-2">
							<Form.Label className="mb-0">Zip</Form.Label>
							<Form.Control
								name="zip"
								placeholder="Zip"
								value={values.zip}
								isValid={touched.zip && !errors.zip}
								isInvalid={!!errors.zip}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="website" className="mb-2">
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
						<Form.Group controlId="email" className="mb-2">
							<Form.Label className="mb-0">Contact email</Form.Label>
							<Form.Control
								name="email"
								value={values.email}
								isValid={touched.email && !errors.email}
								isInvalid={!!errors.email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="phone" className="mb-2">
							<Form.Label className="mb-0">Contact phone number</Form.Label>
							<Form.Control
								name="phone"
								value={values.phone}
								isValid={touched.phone && !errors.phone}
								isInvalid={!!errors.phone}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
						</Form.Group>
						<SubmitButton />
						<CancelButton OnCancel={onClose} canCancel={true} />
					</Form>
				)}
			</Formik>
		</LoadingContainer>
	)
}

export default GolfCourseEdit
