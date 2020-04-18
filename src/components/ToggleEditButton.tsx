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

export interface IToggleEditProps {
    isEditting: boolean;
    openIcon?: ReactNode;
    Toggled: () => void;
}

const ToggleEditButton: React.FC<IToggleEditProps> = (props) => {
    const open = props.openIcon || <TiEdit size={20} color={"warning"} />;
    return (
        <EditButton
            title={props.isEditting ? "Close" : "Edit"}
            className={props.isEditting ? "text-secondary" : "text-warning"}
            onClick={() => props.Toggled()}>
            {props.isEditting ? <TiTimes size={20} color={"primary"} /> : open}
        </EditButton>
    );
};

export default ToggleEditButton;
