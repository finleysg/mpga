import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { TournamentWinner } from "../../models/Events";
import MatchPlayHistoryEdit from "./MatchPlayHistoryEdit";
import { ITournamentWinnerEditProps } from "../tournaments/TournamentWinnerEdit";

export interface IMatchPlayHistoryEditModalProps extends ITournamentWinnerEditProps {
    show: boolean;
}

const MatchPlayHistoryEditModal: React.FC<IMatchPlayHistoryEditModalProps> = (props) => {
    const { winner, Cancel, Save } = props;

    return (
        <Modal show={props.show} onHide={() => Cancel()}>
            <Modal.Header closeButton>
                <Modal.Title>Match Play Champion Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MatchPlayHistoryEdit winner={winner || new TournamentWinner({ id: 0 })} Cancel={Cancel} Save={Save} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={Cancel}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MatchPlayHistoryEditModal;
