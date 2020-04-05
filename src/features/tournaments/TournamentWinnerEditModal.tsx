import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { TournamentWinner } from "../../models/Events";
import TournamentWinnerEdit, { ITournamentWinnerEditProps } from "./TournamentWinnerEdit";

export interface ITournamentWinnerEditModalProps extends ITournamentWinnerEditProps {
    show: boolean;
}

const TournamentWinnerEditModal: React.FC<ITournamentWinnerEditModalProps> = (props) => {
    const { winner, Cancel, Save } = props;

    return (
        <Modal show={props.show} onHide={() => Cancel()}>
            <Modal.Header closeButton>
                <Modal.Title>Tournament Champion Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TournamentWinnerEdit winner={winner || new TournamentWinner({ id: 0 })} Cancel={Cancel} Save={Save} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={Cancel}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TournamentWinnerEditModal;
