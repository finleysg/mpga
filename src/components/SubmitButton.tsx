import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FaSave } from "react-icons/fa";
import { useSelector } from "react-redux";

import { IApplicationState } from "../store";

const SubmitButton: React.FC = () => {
    const appState = useSelector((state: IApplicationState) => state.app);

    return (
        <Button variant="secondary" type="submit" size="sm" disabled={appState.isBusy}>
            {appState.isBusy ? <Spinner animation="border" variant="light" size="sm" /> : <FaSave color="whitesmoke" />}{" "}
            Save
        </Button>
    );
};

export default SubmitButton;
