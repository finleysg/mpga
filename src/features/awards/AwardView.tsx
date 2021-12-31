import React from "react";

import ReactMarkdown from "react-markdown";

import { AwardViewProps } from "./AwardPropTypes";
import AwardWinnerList from "./AwardWinnerList";

const AwardView: React.FC<AwardViewProps> = (props) => {
  const { award } = props;
  return (
    <div>
      <h3 className="text-primary">{award.name}</h3>
      <ReactMarkdown children={award.description} />
      <AwardWinnerList award={award} />
    </div>
  );
};

export default AwardView;
