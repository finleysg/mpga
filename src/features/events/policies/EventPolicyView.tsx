import React from "react";

import MarkdownRender from "components/MarkdownRender";

import { EventPolicyProps } from "../eventsPropType";

const EventPolicyView: React.FC<EventPolicyProps> = (props) => {
  const { policy } = props;
  if (policy && policy.policy) {
    return (
      <div>
        <h5 className="text-primary">{policy.policy.title}</h5>
        <MarkdownRender text={policy.policy.description} />
      </div>
    );
  }
  return null;
};

export default EventPolicyView;
