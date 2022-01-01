import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { MarkdownEditor } from "./MarkdownEditor";

type MarkdownProps = {
  show: boolean;
  text: string;
  Cancel: () => void;
  Close: (markdown: string) => void;
};

const EditorModal: React.FC<MarkdownProps> = (props) => {
  const { text, show, Cancel, Close } = props;
  const [modalText, setModalText] = useState(text);

  const saveAndClose = () => {
    Close(modalText || "");
  };

  return (
    <Modal centered size="lg" show={show} onHide={() => Cancel()}>
      <Modal.Body>
        <MarkdownEditor text={text} previewStyle="vertical" height="600px" onSubmit={(text) => setModalText(text)} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => saveAndClose()}>
          Save and Close
        </Button>
        <Button variant="light" onClick={Cancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditorModal;
