import React from 'react';

import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

export const NotesContainer = styled.div`
    background-color: #fff;
`;

const Notes: React.FC<any> = (props) => {
    return (
        <NotesContainer>
            <ReactMarkdown children={props.children} />
        </NotesContainer>
    );
};

export default Notes;
