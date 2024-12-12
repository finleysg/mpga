import React from "react"

import Button from "react-bootstrap/Button"
import { useSelector } from "react-redux"

import { IApplicationState } from "../store"

export interface IDeleteButtonProps {
	canDelete: boolean
	title?: string
	OnDelete: () => void
}

const DeleteButton: React.FC<IDeleteButtonProps> = (props) => {
	const appState = useSelector((state: IApplicationState) => state.app)

	return (
		<React.Fragment>
			{props.canDelete ? (
				<Button
					variant="outline-danger"
					size="sm"
					className="ms-2"
					disabled={appState.isBusy}
					onClick={() => props.OnDelete()}
				>
					{props.title || "Delete"}
				</Button>
			) : null}
		</React.Fragment>
	)
}

export default DeleteButton
