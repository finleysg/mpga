import React from "react";

import constants, { PageCodes } from "../app-constants";
import SmallLeftLargeRight from "../components/layouts/SmallLeftLargeRight";
import PageContentDetail from "../features/content/PageContentDetail";
import { TeamList } from "../features/match-play/TeamList";

const MatchPlayPage: React.FC = () => {
  return (
    <SmallLeftLargeRight
      LeftColumn={<PageContentDetail pageCode={PageCodes.MatchPlay} />}
      RightColumn={
        <React.Fragment>
          <h3 className="text-primary">{constants.MatchPlayYear} Match Play Teams</h3>
          <div>
            {/* <iframe 
              title="Match Play Team Registration"
              src="https://docs.google.com/forms/d/e/1FAIpQLSc6LnTXNRHpCUgsfnbvnbE3Koi4ShgTGF4baiA2e4qEKPjJ_g/viewform?embedded=true" 
              width="640" 
              height="1168">
                Loading…
            </iframe> */}
          </div>
          <TeamList />
        </React.Fragment>
      }
    />
  )
}

export default MatchPlayPage
