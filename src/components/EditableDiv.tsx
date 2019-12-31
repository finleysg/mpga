import React, { useState, ReactNode } from "react";
import { TiEdit, TiTimes } from "react-icons/ti";
import styled from "styled-components";

const ToggleDiv = styled<IEditState | any>('div')`
    border-width: ${props => props.doEdit ? "1px" : "0"};
    border-color: #cccccc;
    margin-bottom: 2rem;
`
ToggleDiv.displayName = "ToggleDiv";

const ToggleEditButton = styled.a`
    float: right;
    width: 30px;
    height: 30px; 
    text-align: center;
    z-index: 999;
    cursor: pointer;
`;
ToggleEditButton.displayName = "ToggleEditButton";

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
            <ToggleEditButton title="Edit" onClick={() => setDoEdit(!doEdit)}>
                {doEdit
                    ? <TiTimes size={24} color={"teal"} />
                    : <TiEdit size={24} color={"teal"} />}
            </ToggleEditButton>}
            {doEdit ?
                props.editComponent :
                props.viewComponent }
        </ToggleDiv>
    );
}

export default EditableDiv;
