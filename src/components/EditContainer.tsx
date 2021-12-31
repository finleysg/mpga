import React, { ReactNode } from "react";

import styled from "styled-components";

import ToggleEditButton from "./ToggleEditButton";

interface IEditState {
  doEdit: boolean;
}

export const EditOrView = styled<IEditState | any>("div")`
  border-width: ${(props) => (props.doEdit ? "1px" : "0")};
  border-color: silver;
  border-style: solid;
  padding: ${(props) => (props.doEdit ? "10px" : "0")};
  margin-bottom: 10px;
  & .tui-editor-contents {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
  }
  & img {
    max-width: 95%;
    object-fit: contain;
  }
  & table {
    margin-bottom: 1rem;
    color: #212529;
    border-collapse: collapse;
  }
  & thead th {
    background-color: #9a72d4;
    font-weight: 500;
    color: #fff;
    vertical-align: bottom;
    border-bottom: 2px solid #6f42c1;
    border-top: 1px solid #9a72d4;
    padding: 0.3rem;
  }
  & tbody td {
    padding: 0.3rem;
    border-top: 1px solid #dee2e6;
  }
  & tbody tr:nth-of-type(2n + 1) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  & blockquote {
    margin: 14px 0;
    border-left: 4px solid #e5e5e5;
    padding: 0 16px;
    min-height: 20px;
    color: #999;
  }
`;
EditOrView.displayName = "EditOrView";

type EditableProps = {
  viewComponent: ReactNode;
  editComponent: ReactNode;
  doEdit: boolean;
  canEdit: boolean;
  hideEdit?: boolean;
  openIcon?: ReactNode;
  onToggleEdit: () => void;
};

const EditContainer: React.FC<EditableProps> = (props) => {
  const { viewComponent, editComponent, doEdit, canEdit, hideEdit, onToggleEdit } = props;
  return (
    <EditOrView doEdit={doEdit}>
      {canEdit && hideEdit !== true && (
        <ToggleEditButton isEditting={doEdit} openIcon={props.openIcon} onToggled={() => onToggleEdit()} />
      )}
      {doEdit ? editComponent : viewComponent}
    </EditOrView>
  );
};

export default EditContainer;
