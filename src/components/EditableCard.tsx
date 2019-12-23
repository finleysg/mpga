import React, { useState, ReactNode } from "react";
import Card from "react-bootstrap/Card";
import { TiEdit, TiTimes } from "react-icons/ti";
import styled from "styled-components";

const ToggleEditButton = styled.a`
    width: 30px;
    height: 30px; 
    text-align: center;
    margin: 5px 5px -35px auto;
    z-index: 999;
    cursor: pointer;
`;
ToggleEditButton.displayName = "ToggleEditButton";

export interface IEditableCard {
    viewComponent: ReactNode,
    editComponent: ReactNode,
    initEdit: boolean,
    canEdit: boolean,
};

const EditableCard: React.FC<IEditableCard> = (props) => {
    const [doEdit, setDoEdit] = useState(props.initEdit);
    return (
        <Card border={doEdit ? "secondary" : "light"} className="mb-2">
            {props.canEdit &&
            <ToggleEditButton title="Edit" onClick={() => setDoEdit(!doEdit)}>
                {doEdit
                    ? <TiTimes size={24} color={"teal"} />
                    : <TiEdit size={24} color={"teal"} />}
            </ToggleEditButton>}
            {doEdit ?
                props.editComponent :
                props.viewComponent }
        </Card>
    );
}

export default EditableCard;
