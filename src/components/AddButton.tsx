import React from "react";
import { TiPlus } from "react-icons/ti";
import styled from "styled-components";

const AddButtonContainer = styled.a`
    float: right;
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
        <AddButtonContainer title="Add" onClick={() => props.AddRequested()}>
            <TiPlus size={24} color={"teal"} />
        </AddButtonContainer>
    );
}

export default AddButton;
