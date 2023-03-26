import React from "react";

//import { TeamList } from "features/match-play/TeamList";
import constants, { PageCodes } from "../app-constants";
import SmallLeftLargeRight from "../components/layouts/SmallLeftLargeRight";
import PageContentDetail from "../features/content/PageContentDetail";

const MatchPlayPage: React.FC = () => {
  return (
    <SmallLeftLargeRight
      LeftColumn={<PageContentDetail pageCode={PageCodes.MatchPlay} />}
      RightColumn={
        <React.Fragment>
          <h3 className="text-primary">{constants.MatchPlayYear} Match Play Teams</h3>
          {/* <div>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSe7ddnwzfsBes20GNs2BA3uEzV0WKtTaT0s0__wXPMv0qASAA/viewform?embedded=true"
              title="MPGA Match Play Team Registration Form"
              width="640"
              height="1168"
            >
              Loading…
            </iframe>
          </div> */}
          {/* <TeamList /> */}
          <p>Coming soon...</p>
        </React.Fragment>
      }
    />
  );
};

export default MatchPlayPage;
