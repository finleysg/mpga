import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import DocumentEdit, { IDocumentEdit } from "./DocumentEdit";

export interface IDocumentEditModalProps extends IDocumentEdit {
  show: boolean;
}

const DocumentEditModal: React.FC<IDocumentEditModalProps> = (props) => {
  const { document, Cancel, Save, Delete } = props;

  return (
    <React.Fragment>
      {document !== undefined && (
        <Modal show={props.show} onHide={() => Cancel()}>
          <Modal.Header closeButton>
            <Modal.Title className="text-primary">Document Upload / Edit / Replace</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DocumentEdit
              document={document}
              tournaments={props.tournaments}
              Cancel={Cancel}
              Delete={Delete}
              Save={Save}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={Cancel}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default DocumentEditModal;
