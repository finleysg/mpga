import React, { ReactNode } from "react";

import { TiEdit, TiTimes } from "react-icons/ti";
import styled from "styled-components";

const EditButton = styled.div`
  float: right;
  width: 24px;
  height: 24px;
  text-align: right;
  margin: 0;
  z-index: 999;
  cursor: pointer;
`;
EditButton.displayName = "EditButton";

type ToggleEditProps = {
  isEditting: boolean;
  openIcon?: ReactNode;
  onToggled: () => void;
};

const ToggleEditButton: React.FC<ToggleEditProps> = (props) => {
  const { openIcon, isEditting, onToggled } = props;
  const open = openIcon || <TiEdit size={20} color={"warning"} />;
  return (
    <EditButton
      title={isEditting ? "Close" : "Edit"}
      className={isEditting ? "text-secondary" : "text-warning"}
      onClick={() => onToggled()}
    >
      {isEditting ? <TiTimes size={20} color={"primary"} /> : open}
    </EditButton>
  );
};

export default ToggleEditButton;
