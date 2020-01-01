import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface IConfirmProps {
    show: boolean;
    cancelText?: string;
    confirmText?: string;
    messageText: string;
    titleText: string;
    DoConfirm: () => void;
    DoCancel: () => void;
}

const Confirm: React.FC<IConfirmProps> = (props) => {
    const { messageText, titleText, DoConfirm, DoCancel } = props;
    const cancelText = props.cancelText || "Cancel";
    const confirmText = props.confirmText || "Continue";

    return (
        <Modal show={props.show} onHide={() => DoCancel()}>
            <Modal.Header closeButton>
                <Modal.Title>{titleText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{messageText}</Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={() => DoCancel()}>
                    {cancelText}
                </Button>
                <Button variant="danger" onClick={() => DoConfirm()}>
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Confirm;
