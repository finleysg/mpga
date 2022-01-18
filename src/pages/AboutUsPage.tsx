import React from "react";

import { IDocumentSearch } from "features/documents/documentPropTypes";
import Container from "react-bootstrap/Container";

import { PageCodes } from "../app-constants";
import OneCenteredColumn from "../components/layouts/OneCenteredColumn";
import PageContentDetail from "../features/content/PageContentDetail";
import LatestOnly from "../features/documents/LatestOnly";

const AboutUsPage: React.FC = () => {
  const query: IDocumentSearch = {
    key: "bylaws",
    documentTypes: ["ByLaws"],
  };
  return (
    <Container fluid={true}>
      <OneCenteredColumn>
        <h1 className="text-secondary">About Us</h1>
        <PageContentDetail pageCode={PageCodes.OurMission} />
        <h3 className="text-primary">By Laws</h3>
        <LatestOnly query={query} />
      </OneCenteredColumn>
    </Container>
  );
};

export default AboutUsPage;
