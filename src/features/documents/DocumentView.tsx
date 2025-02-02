import React from "react"

import Button from "react-bootstrap/Button"

import { DocumentViewProps, DocumentViewType } from "./documentPropTypes"

const DocumentView: React.FC<DocumentViewProps> = (props) => {
	const { document, render } = props

	const renderView = () => {
		switch (render.viewType) {
			case DocumentViewType.Link:
				return (
					<a
						href={document.file!}
						className={render.className || ""}
						target={render.external ? "_blank" : "_self"}
						rel="noreferrer"
					>
						{document.title}
					</a>
				)
			case DocumentViewType.Button:
				return (
					<Button
						as="a"
						href={document.file}
						target={render.external ? "_blank" : "_self"}
						size="sm"
						variant={render.variant || "light"}
					>
						{document.title}
					</Button>
				)
			case DocumentViewType.Detail:
				return (
					<p>
						<a
							href={document.file!}
							className={render.className || ""}
							target={render.external ? "_blank" : "_self"}
							rel="noreferrer"
						>
							{document.title}
						</a>
						<span>{document.year}</span>
						<span>{document.lastUpdate?.toDateString()}</span>
						<span>TODO: derive type</span>
					</p>
				)
			default:
				return <></>
		}
	}

	return renderView()
}

export default DocumentView
