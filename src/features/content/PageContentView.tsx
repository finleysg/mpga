import React from "react";

import MarkdownRender from "../../components/MarkdownRender";
import { PageContentViewProps } from "./contentPropTypes";

const PageContentView: React.FC<PageContentViewProps> = (props) => {
  const { pageContent } = props;
  return (
    <div>
      <h3 className="text-primary mb-3">{pageContent.title}</h3>
      <MarkdownRender text={pageContent.content} />
    </div>
  );
};

export default PageContentView;
