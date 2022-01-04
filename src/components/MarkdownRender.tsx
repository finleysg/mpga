import React from "react";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

type MarkdownData = {
  text: string;
};

// TODO: only allow span with a color attribute
const MarkdownRender: React.FC<MarkdownData> = (props) => {
  const { text } = props;
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {text}
    </ReactMarkdown>
  );
};

export default MarkdownRender;
