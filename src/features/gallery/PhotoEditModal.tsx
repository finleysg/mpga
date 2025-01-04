import React from "react"

import { Formik } from "formik"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { toast } from "react-toastify"
import styled from "styled-components"
import * as yup from "yup"

import { ITag, MpgaPhoto } from "../../models/Documents"
import TagPicker from "../tags/TagPicker"
import { useUpdatePhotoMutation } from "./galleryApi"
import { PhotoEditrops } from "./galleryPropTypes"

const PhotoImg = styled.img`
	display: block;
	margin-left: auto;
	margin-right: auto;
`

const schema = yup.object({
	caption: yup.string().max(240),
})

const PhotoEditModal: React.FC<PhotoEditrops> = (props) => {
	const { photo, show, onClose } = props
	const [updatePhoto, { isLoading: isUpdating }] = useUpdatePhotoMutation()

	const handleSave = async (value: MpgaPhoto) => {
		const params = {
			photo: value.prepJson(),
		}
		await updatePhoto(params)
			.unwrap()
			.then(() => {
				toast.success(`Your changes have been saved.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	return (
		<Modal size="xl" show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add or Update the Photo Caption</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<PhotoImg src={photo.imageUrl} />
				<Formik validationSchema={schema} onSubmit={handleSave} initialValues={photo}>
					{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
						<Form noValidate onSubmit={handleSubmit}>
							<Form.Group controlId="caption" className="mb-2">
								<Form.Label className="mb-0">Caption</Form.Label>
								<Form.Control
									placeholder="Caption"
									name="caption"
									value={values.caption || ""}
									isValid={touched.caption && !errors.caption}
									isInvalid={!!errors.caption}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<Form.Control.Feedback type="invalid">{errors.caption}</Form.Control.Feedback>
							</Form.Group>
							<TagPicker
								selectedTags={values.tags || []}
								OnChange={(tags: ITag[]) => (values.tags = tags)}
							/>
							<Button
								variant="secondary"
								type="submit"
								size="sm"
								className="mt-2"
								disabled={isUpdating}
							>
								Save
							</Button>
							<Button className="ms-2 mt-2" variant="light" size="sm" onClick={onClose}>
								Cancel
							</Button>
						</Form>
					)}
				</Formik>
			</Modal.Body>
		</Modal>
	)
}

export default PhotoEditModal
