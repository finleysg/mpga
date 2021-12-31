import "@toast-ui/editor/dist/toastui-editor.css";
import "codemirror/lib/codemirror.css";

import { Editor, EditorProps } from "@toast-ui/react-editor";

import React from "react";

type MarkdownEditorData = {
  source: string;
  content: string;
};

type MarkdownEditorProps = EditorProps & {
  text: string;
  onChange: (data: MarkdownEditorData) => void;
};

function MarkdownEditor(props: MarkdownEditorProps) {
  const { text, onChange, ...rest } = props;
  const editorRef = React.useRef<Editor>();

  const handleChange = () => {
    const content = editorRef.current?.getInstance().getMarkdown() || text;
    onChange({
      source: "markdown",
      content,
    });
  };

  return (
    <Editor
      initialValue={text}
      previewStyle="tab"
      initialEditType="wysiwyg"
      useDefaultHTMLSanitizer={true}
      onChange={handleChange}
      toolbarItems={[
        "heading",
        "bold",
        "italic",
        "strike",
        "divider",
        "hr",
        "quote",
        "divider",
        "ul",
        "ol",
        "task",
        "indent",
        "outdent",
        "divider",
        "table",
        "image",
        "link",
      ]}
      ref={editorRef}
      {...rest}
    />
  );
}

export { MarkdownEditor };
