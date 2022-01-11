import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import DocumentEdit from "./DocumentEdit";
import { DocumentEditProps } from "./documentPropTypes";

type DocumentEditModalProps = DocumentEditProps & {
  show: boolean;
};

const DocumentEditModal: React.FC<DocumentEditModalProps> = (props) => {
  const { document, onClose, show } = props;

  return (
    <React.Fragment>
      {document && (
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-primary">Document Upload / Edit / Replace</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DocumentEdit document={document} onClose={onClose} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={onClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default DocumentEditModal;
