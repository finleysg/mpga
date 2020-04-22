import React from "react";
import Button from "react-bootstrap/Button";

export interface ICancelButtonProps {
    canCancel: boolean;
    title?: string;
    OnCancel: () => void;
}

const CancelButton: React.FC<ICancelButtonProps> = (props) => {
    return (
        <React.Fragment>
            {props.canCancel ? (
                <Button variant="light" size="sm" className="ml-2" onClick={() => props.OnCancel()}>
                    {props.title || "Cancel"}
                </Button>
            ) : null}
        </React.Fragment>
    );
};

export default CancelButton;
