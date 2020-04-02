import React from "react";
import Button from "react-bootstrap/Button";

export interface ISubmitButtonProps {
    isBusy: boolean;
}

const SubmitButton: React.FC<ISubmitButtonProps> = props => {
    return (
        <Button variant="primary" type="submit" size="sm" disabled={props.isBusy}>
            {props.isBusy ? "Saving..." : "Save"}
        </Button>
    );
};

export default SubmitButton;
