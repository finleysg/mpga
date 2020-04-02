import React, { ReactNode } from "react";
import styled from "styled-components";

import ToggleEditButton from "./ToggleEditButton";

export const EditOrView = styled<IEditState | any>("div")`
    border-width: ${props => (props.doEdit ? "1px" : "0")};
    border-color: teal;
    border-style: solid;
    padding: ${props => (props.doEdit ? "10px" : "0")};
    margin-bottom: 10px;
`;
EditOrView.displayName = "EditOrView";

export interface IEditableDiv {
    viewComponent: ReactNode;
    editComponent: ReactNode;
    doEdit: boolean;
    canEdit: boolean;
    openIcon?: ReactNode;
    ToggleEdit: (edit: boolean) => void;
}

export interface IEditState {
    doEdit: boolean;
}

const EditContainer: React.FC<IEditableDiv> = props => {
    const { viewComponent, editComponent, doEdit, canEdit, ToggleEdit } = props;
    return (
        <EditOrView doEdit={doEdit}>
            {canEdit && (
                <ToggleEditButton isEditting={doEdit} openIcon={props.openIcon} Toggled={() => ToggleEdit(!doEdit)} />
            )}
            {doEdit ? editComponent : viewComponent}
        </EditOrView>
    );
};

export default EditContainer;
