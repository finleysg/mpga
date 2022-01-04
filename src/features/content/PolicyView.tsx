import React from "react";

import MarkdownRender from "components/MarkdownRender";

import { PolicyViewProps } from "./contentPropTypes";

const PolicyView: React.FC<PolicyViewProps> = (props) => {
  const { policy } = props;
  return (
    <div>
      <h5 className="text-secondary">{policy.title}</h5>
      <MarkdownRender text={policy.description} />
    </div>
  );
};

export default PolicyView;
