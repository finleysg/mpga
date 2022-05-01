import React from "react";

import SmallLeftLargeRight from "../components/layouts/SmallLeftLargeRight";
import MatchPlayDocuments from "../features/match-play/MatchPlayDocuments";
import MatchResultEntry from "../features/match-play/MatchResultEntry";
import { MatchResultList } from "../features/match-play/MatchResultList";

const MatchPlayResultsPage: React.FC = () => {
  return (
    <SmallLeftLargeRight
      LeftColumn={
        <React.Fragment>
          <h3 className="text-primary">Schedule and Results</h3>
          <MatchPlayDocuments />
          <h3 className="text-primary">Post a Match Result</h3>
          <MatchResultEntry />
        </React.Fragment>
      }
      RightColumn={
        <React.Fragment>
          <MatchResultList />
        </React.Fragment>
      }
    />
  );
};

export default MatchPlayResultsPage;
