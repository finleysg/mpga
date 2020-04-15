import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { TiEdit, TiTimes } from "react-icons/ti";
import styled from "styled-components";
import { IEditable } from "./EditableDiv";

const ToggleEditButton = styled.a`
    width: 30px;
    height: 30px; 
    text-align: center;
    margin: 5px 5px -35px auto;
    z-index: 999;
    cursor: pointer;
`;
ToggleEditButton.displayName = "ToggleEditButton";

const EditableCard: React.FC<IEditable> = (props) => {
    const [doEdit, setDoEdit] = useState(props.initEdit);
    return (
        <Card border={doEdit ? "secondary" : "light"} className="mb-2">
            {props.canEdit &&
            <ToggleEditButton title="Edit" onClick={() => setDoEdit(!doEdit)}>
                {doEdit
                    ? <TiTimes size={24} color={"primary"} />
                    : <TiEdit size={24} color={"primary"} />}
            </ToggleEditButton>}
            {doEdit ?
                props.editComponent :
                props.viewComponent }
        </Card>
    );
}

export default EditableCard;
