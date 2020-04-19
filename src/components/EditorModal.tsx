import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { Editor } from "@toast-ui/react-editor";

export interface IMarkdownProps {
    show: boolean;
    text: string;
    Cancel: () => void;
    Close: (markdown: string) => void;
}

const EditorModal: React.FC<IMarkdownProps> = (props) => {
    const { text, show, Cancel, Close } = props;
    const editorRef = React.createRef<Editor>();

    const saveAndClose = () => {
        const markdown = editorRef?.current?.getInstance().getMarkdown();
        Close(markdown || "");
    }

    return (
        <Modal centered size="lg" show={show} onHide={() => Cancel()}>
            <Modal.Body>
                <Editor
                    initialValue={text}
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="wysiwyg"
                    useCommandShortcut={true}
                    useDefaultHTMLSanitizer={true}
                    ref={editorRef}
                />
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
