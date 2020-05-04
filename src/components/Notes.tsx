import React from 'react';
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';

export const NotesContainer = styled.div`
    background-color: #fff;
`;

const Notes: React.FC<any> = (props) => {
    return (
        <NotesContainer>
            <ReactMarkdown source={props.children} escapeHtml={true} />
        </NotesContainer>
    );
}

export default Notes;