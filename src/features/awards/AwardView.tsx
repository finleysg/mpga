import React from "react";

import MarkdownRender from "../../components/MarkdownRender";
import { AwardViewProps } from "./awardPropTypes";
import AwardWinnerList from "./AwardWinnerList";

const AwardView: React.FC<AwardViewProps> = (props) => {
  const { award } = props;
  return (
    <div>
      <h3 className="text-primary">{award.name}</h3>
      <MarkdownRender text={award.description} />
      <AwardWinnerList award={award} />
    </div>
  );
};

export default AwardView;
