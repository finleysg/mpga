import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

const ProcessingContainer = styled.div`
    display: flex;
    flex-direction: column;  
    justify-content: center; 
    align-items: center;    
    height: 60px;
    > div {
        text-align: center;
    }
    > p {
        text-align: center;
        margin-bottom: 12px;
    }
`;
ProcessingContainer.displayName = "ProcessingContainer";

export interface IProcessingProps {
    message?: string;
}

const Processing: React.FC<IProcessingProps> = (props) => {
    return (
        <ProcessingContainer>
            <p className="text-primary">{props.message || "Processing..."}</p>
            <Spinner animation="border" variant="primary" role="status">
                <span className="sr-only">Processing...</span>
            </Spinner>
        </ProcessingContainer>
    );
};

export default Processing;
