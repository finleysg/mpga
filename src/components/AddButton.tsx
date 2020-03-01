import React from "react";
import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";

const AddButtonContainer = styled.a`
    float: right;
    margin-top: -30px;
    width: 30px;
    height: 30px; 
    text-align: center;
    z-index: 999;
    cursor: pointer;
`;
AddButtonContainer.displayName = "AddButtonContainer";

export interface IAddProps {
    AddRequested: () => void;
}

const AddButton: React.FC<IAddProps> = (props) => {
    return (
        <AddButtonContainer title="Add New" onClick={() => props.AddRequested()}>
            <FaPlusCircle size={24} color={"purple"} />
        </AddButtonContainer>
    );
}

export default AddButton;
