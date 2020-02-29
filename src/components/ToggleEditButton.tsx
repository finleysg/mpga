import React from "react";
import { TiEdit, TiTimes } from "react-icons/ti";
import styled from "styled-components";

const EditButton = styled.a`
    float: right;
    width: 30px;
    height: 30px; 
    text-align: center;
    z-index: 999;
    cursor: pointer;
`;
EditButton.displayName = "EditButton";

export interface IToggleEditProps {
    isEditting: boolean;
    Toggled: () => void;
}

const ToggleEditButton: React.FC<IToggleEditProps> = (props) => {
    return (
        <EditButton title={props.isEditting ? "Cancel" : "Edit"} onClick={() => props.Toggled()}>
            {props.isEditting
                ? <TiTimes size={24} color={"teal"} />
                : <TiEdit size={24} color={"teal"} />}
        </EditButton>
    );
}

export default ToggleEditButton;
