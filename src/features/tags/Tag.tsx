import React from "react"

import Badge from "react-bootstrap/Badge"
import { TiTimes } from "react-icons/ti"
import styled from "styled-components"

import { ITag } from "../../models/Documents"

const TagRemover = styled.a`
	color: white;
	cursor: pointer;
`
TagRemover.displayName = "TagRemover"

export interface ITagProps {
	tag: ITag
	RemoveTag: (tag: ITag) => void
}

const Tag: React.FC<ITagProps> = (props) => {
	const { tag } = props
	return (
		<Badge>
			{tag.name}{" "}
			<TagRemover onClick={() => props.RemoveTag(tag)}>
				<TiTimes size={16} />
			</TagRemover>
		</Badge>
	)
}

export default Tag
