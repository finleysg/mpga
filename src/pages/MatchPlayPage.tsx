import React from "react";

import { TeamList } from "features/match-play/TeamList";

import { PageCodes } from "../app-constants";
import SmallLeftLargeRight from "../components/layouts/SmallLeftLargeRight";
import PageContentDetail from "../features/content/PageContentDetail";

const MatchPlayPage: React.FC = () => {
  return (
    <SmallLeftLargeRight
      LeftColumn={<PageContentDetail pageCode={PageCodes.MatchPlay} />}
      RightColumn={
        <React.Fragment>
          {/* <h3 className="text-primary">{constants.MatchPlayYear} Match Play Registration</h3>
          <div>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdK-ZB7H1RppvXKq0ozfI__2duW3YmI-OXG_wAMrWES3xu9HQ/viewform?embedded=true"
              title="MPGA Match Play Team Registration Form"
              width="640"
              height="1168"
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
            >
              Loading…
            </iframe>
          </div> */}
          <TeamList />
        </React.Fragment>
      }
    />
  );
};

export default MatchPlayPage;
