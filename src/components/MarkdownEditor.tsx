import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";

import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
import { Editor, EditorProps } from "@toast-ui/react-editor";

import React from "react";

export type MarkdownEditorProps = EditorProps & {
  text: string;
  onSubmit: (content: string) => void;
};

function MarkdownEditor(props: MarkdownEditorProps) {
  const { text, onSubmit, ...rest } = props;
  const editorRef = React.useRef<Editor>();

  const handleChange = () => {
    const content = editorRef.current?.getInstance().getMarkdown() || text;
    onSubmit(content);
  };

  return (
    <Editor
      initialValue={text}
      previewStyle="tab"
      initialEditType="wysiwyg"
      onChange={handleChange}
      toolbarItems={[
        ["heading", "bold", "italic", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task", "indent", "outdent"],
        ["table", "image", "link"],
      ]}
      plugins={[colorPlugin]}
      ref={editorRef}
      {...rest}
    />
  );
}

export { MarkdownEditor };
