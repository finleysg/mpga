import React, { useState, ReactNode } from "react";
import styled from "styled-components";
import ToggleEditButton from "./ToggleEditButton";

const ToggleDiv = styled<IEditState | any>('div')`
    border-width: ${props => props.doEdit ? "1px" : "0"};
    border-color: teal;
    border-style: solid;
    padding: ${props => props.doEdit ? "10px" : "0"};
    margin-bottom: 2rem;
`
ToggleDiv.displayName = "ToggleDiv";

export interface IEditable {
    viewComponent: ReactNode,
    editComponent: ReactNode,
    initEdit: boolean,
    canEdit: boolean,
};

export interface IEditState {
    doEdit: boolean;
}

const EditableDiv: React.FC<IEditable> = (props) => {
    const [doEdit, setDoEdit] = useState(props.initEdit);
    return (
        <ToggleDiv doEdit={doEdit}>
            {props.canEdit &&
            <ToggleEditButton isEditting={doEdit} Toggled={() => setDoEdit(!doEdit)} />}
            {doEdit ?
                props.editComponent :
                props.viewComponent }
        </ToggleDiv>
    );
}

export default EditableDiv;
