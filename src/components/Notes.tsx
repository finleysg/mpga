import React from "react";

import styled from "styled-components";

import MarkdownRender from "./MarkdownRender";

export const NotesContainer = styled.div`
  background-color: #fff;
`;

const Notes: React.FC<any> = (props) => {
  return (
    <NotesContainer>
      <MarkdownRender text={props.children} />
    </NotesContainer>
  );
};

export default Notes;
