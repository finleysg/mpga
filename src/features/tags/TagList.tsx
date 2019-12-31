import React from "react";
import { ITag } from "../../models/Documents";
import Tag from "./Tag";
import styled from "styled-components";

const TagContainer = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
        display: inline;
        padding-right: 5px;
    }
`;
TagContainer.displayName = "TagContainer";

export interface ITagListProps {
    tags: ITag[],
    RemoveTag: (tag: ITag) => void,
};

const TagList: React.FC<ITagListProps> = (props) => {
    const { tags } = props;
    return (
        <TagContainer>
            {tags && tags.map((tag: ITag) => <li key={tag.id}>
                <Tag tag={tag} RemoveTag={() => props.RemoveTag(tag)} />
            </li>)}
        </TagContainer>
    );
};

export default TagList;
