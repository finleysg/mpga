import React from "react";

import Container from "react-bootstrap/Container";

import OneCenteredColumn from "../components/layouts/OneCenteredColumn";
import { PageCodes } from "../constants";
import PageContentDetail from "../features/content/PageContentDetail";

const CodeOfConductPage: React.FC = () => {
  return (
    <Container fluid={true}>
      <OneCenteredColumn>
        <>
          <PageContentDetail pageCode={PageCodes.CodeOfConduct} />
        </>
      </OneCenteredColumn>
    </Container>
  );
};

export default CodeOfConductPage;
