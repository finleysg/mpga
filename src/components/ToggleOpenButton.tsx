import React from "react";
import { FaCaretRight, FaCaretDown } from "react-icons/fa";
import styled from "styled-components";

const OpenButton = styled.a`
    width: 30px;
    height: 30px; 
    text-align: center;
    z-index: 999;
    cursor: pointer;
`;
OpenButton.displayName = "OpenButton";

export interface IToggleOpenProps {
    isOpen: boolean;
    Toggled: () => void;
}

const ToggleOpenButton: React.FC<IToggleOpenProps> = (props) => {
    return (
        <OpenButton title="Open" onClick={() => props.Toggled()}>
            {props.isOpen
                ? <FaCaretDown size={24} color={"primary"} />
                : <FaCaretRight size={24} color={"primary"} />}
        </OpenButton>
    );
}

export default ToggleOpenButton;
