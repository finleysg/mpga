import React from "react";

import Container from "react-bootstrap/Container";

import LargeLeftSmallRight from "../components/layouts/LargeLeftSmallRight";
import { PageCodes } from "../constants";
import PageContentDetail from "../features/content/PageContentDetail";
import MemberClubList from "../features/member-clubs/MemberClubList";
import RegistrationOverview from "../features/member-clubs/RegistrationOverview";

const MemberClubsPage: React.FC = () => {
  return (
    <Container fluid={true}>
      <LargeLeftSmallRight
        LeftColumn={
          <div>
            <PageContentDetail pageCode={PageCodes.MemberClubs} />
            <MemberClubList />
          </div>
        }
        RightColumn={<RegistrationOverview />}
      />
    </Container>
  );
};

export default MemberClubsPage;
