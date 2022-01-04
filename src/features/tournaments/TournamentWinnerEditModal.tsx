import React from "react";

import Modal from "react-bootstrap/Modal";

import { TournamentWinner } from "../../models/Events";
import { TournamentWinnerEditProps } from "./tournamentPropTypes";
import TournamentWinnerEdit from "./TournamentWinnerEdit";

const TournamentWinnerEditModal: React.FC<TournamentWinnerEditProps & { show: boolean }> = (props) => {
  const { show, winner, onClose } = props;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tournament Champion Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TournamentWinnerEdit winner={winner || new TournamentWinner({ id: 0 })} onClose={onClose} />
      </Modal.Body>
      {/* <Modal.Footer>
                <Button variant="light" onClick={Cancel}>
                    Cancel
                </Button>
            </Modal.Footer> */}
    </Modal>
  );
};

export default TournamentWinnerEditModal;
