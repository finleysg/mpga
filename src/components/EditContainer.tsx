import React, { ReactNode } from "react";
import styled from "styled-components";

import ToggleEditButton from "./ToggleEditButton";

interface IEditState {
    doEdit: boolean;
}

export const EditOrView = styled<IEditState | any>("div")`
    border-width: ${props => (props.doEdit ? "1px" : "0")};
    border-color: silver;
    border-style: solid;
    padding: ${props => (props.doEdit ? "10px" : "0")};
    margin-bottom: 10px;
`;
EditOrView.displayName = "EditOrView";

export interface IEditable {
    viewComponent: ReactNode;
    editComponent: ReactNode;
    doEdit: boolean;
    canEdit: boolean;
    hideEdit?: boolean;
    openIcon?: ReactNode;
    ToggleEdit: () => void;
}

const EditContainer: React.FC<IEditable> = props => {
    const { viewComponent, editComponent, doEdit, canEdit, hideEdit, ToggleEdit } = props;
    return (
        <EditOrView doEdit={doEdit}>
            {canEdit && hideEdit !== true && (
                <ToggleEditButton isEditting={doEdit} openIcon={props.openIcon} Toggled={() => ToggleEdit()} />
            )}
            {doEdit ? editComponent : viewComponent}
        </EditOrView>
    );
};

export default EditContainer;
