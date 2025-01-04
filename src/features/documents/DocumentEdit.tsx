import React, { useState } from "react"

import { Formik } from "formik"
import Form from "react-bootstrap/Form"
import { toast } from "react-toastify"
import * as yup from "yup"

import CancelButton from "../../components/CancelButton"
import Confirm from "../../components/Confirm"
import DeleteButton from "../../components/DeleteButton"
import { FilePicker } from "../../components/FilePicker"
import LoadingContainer from "../../components/LoadingContainer"
import SubmitButton from "../../components/SubmitButton"
import { useGetTournamentsQuery } from "../../features/tournaments/tournamentApi"
import { ITag, MpgaDocument } from "../../models/Documents"
import TagPicker from "../tags/TagPicker"
import {
	useAddDocumentMutation,
	useDeleteDocumentMutation,
	useUpdateDocumentMutation,
} from "./documentApi"
import { DocumentEditProps } from "./documentPropTypes"

interface IDocument {
	id?: number
	year?: number
	title: string
	documentType: string
	tournamentId?: number
	file?: File
	tags?: ITag[]
}

const schema = yup.object({
	year: yup.number().required(),
	title: yup.string().required(),
	documentType: yup.string().required(),
})

const DocumentEdit: React.FC<DocumentEditProps> = (props) => {
	const { document, file, onClose } = props

	const [showConfirmation, setShowConfirmation] = useState(false)
	const { data: tournaments } = useGetTournamentsQuery()
	const [addDocument, { isLoading: isSaving }] = useAddDocumentMutation()
	const [updateDocument, { isLoading: isUpdating }] = useUpdateDocumentMutation()
	const [deleteDocument, { isLoading: isDeleting }] = useDeleteDocumentMutation()

	const isBusy = isSaving || isUpdating || isDeleting

	const doc: IDocument = {
		id: document?.id || 0,
		year: document?.year,
		title: document?.title,
		documentType: document?.documentType,
		tournamentId: document?.tournament,
		tags: document?.tags,
		file: file,
	}

	const handleConfirmRemoveCancel = () => {
		setShowConfirmation(false)
	}

	const handleDelete = async () => {
		setShowConfirmation(false)
		await deleteDocument(document.id)
			.unwrap()
			.then(() => {
				toast.success(`${document.title} has been deleted.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	const handleSave = async (value: IDocument) => {
		const newModel = new MpgaDocument(value)
		newModel.id = doc.id
		newModel.tournament = value.tournamentId || document?.tournament
		newModel.documentType = value.documentType
		newModel.tags = value.tags
		const params = {
			document: newModel.prepJson(),
			file: value.file,
		}
		const mutation = document.id ? updateDocument(params) : addDocument(params)
		await mutation
			.unwrap()
			.then(() => {
				toast.success(`${newModel.title} has been saved.`)
				onClose()
			})
			.catch((error) => {
				toast.error("💣 " + error)
			})
	}

	return (
		<LoadingContainer loading={isBusy}>
			<Formik validationSchema={schema} onSubmit={handleSave} initialValues={doc}>
				{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group controlId="doc.Year" className="mb-2">
							<Form.Label className="mb-0">Year</Form.Label>
							<Form.Control
								placeholder="Year"
								name="year"
								value={values.year?.toString()}
								isValid={touched.year && !errors.year}
								isInvalid={!!errors.year}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="doc.Title" className="mb-2">
							<Form.Label className="mb-0">Title</Form.Label>
							<Form.Control
								placeholder="Document title"
								name="title"
								value={values.title}
								isValid={touched.title && !errors.title}
								isInvalid={!!errors.title}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="doc.DocumentType" className="mb-2">
							<Form.Label className="mb-0">Document type</Form.Label>
							<Form.Control
								as="select"
								name="documentType"
								value={values.documentType}
								isValid={touched.documentType && !errors.documentType}
								isInvalid={!!errors.documentType}
								onChange={handleChange}
								onBlur={handleBlur}
							>
								<option value=""></option>
								<option value="Agenda">Agenda</option>
								<option value="ByLaws">ByLaws</option>
								<option value="Club Registration">Club Registration</option>
								<option value="Financial">Financial</option>
								<option value="Hard Card">Hard Card</option>
								<option value="Match Play">Match Play</option>
								<option value="Match Play Brackets">Match Play Brackets</option>
								<option value="Minutes">Minutes</option>
								<option value="Other">Other</option>
								<option value="Registration">Registration</option>
								<option value="Results">Results</option>
								<option value="Standing Orders">Standing Orders</option>
								<option value="Tee Times">Tee Times</option>
							</Form.Control>
						</Form.Group>
						<Form.Group className="mb-2">
							<Form.Label className="mb-0">Tournament</Form.Label>
							<Form.Control
								as="select"
								name="tournamentId"
								value={values.tournamentId?.toString()}
								isValid={touched.tournamentId && !errors.tournamentId}
								isInvalid={!!errors.tournamentId}
								onChange={handleChange}
								onBlur={handleBlur}
							>
								<option key={0} value={undefined}></option>
								{tournaments?.map((tournament) => {
									return (
										<option key={tournament.id} value={tournament.id}>
											{tournament.name}
										</option>
									)
								})}
							</Form.Control>
						</Form.Group>
						<FilePicker
							onDrop={(files: any[]) => (values.file = files[0])}
							onSelected={(files: any[]) => (values.file = files[0])}
						/>
						<TagPicker
							selectedTags={values.tags || []}
							OnChange={(tags: ITag[]) => (values.tags = tags)}
						/>
						<SubmitButton />
						<DeleteButton canDelete={doc.id !== 0} OnDelete={() => setShowConfirmation(true)} />
						<CancelButton canCancel={true} OnCancel={onClose} />
					</Form>
				)}
			</Formik>
			<Confirm
				show={showConfirmation}
				titleText="Delete Document?"
				messageText="Please confirm that we should delete this document."
				confirmText="Delete"
				DoCancel={handleConfirmRemoveCancel}
				DoConfirm={handleDelete}
			/>
		</LoadingContainer>
	)
}

export default DocumentEdit
