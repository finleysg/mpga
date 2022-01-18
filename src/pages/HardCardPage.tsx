import React from "react";

import Container from "react-bootstrap/Container";

import { PolicyCodes } from "../app-constants";
import OneCenteredColumn from "../components/layouts/OneCenteredColumn";
import PolicyList from "../features/content/PolicyList";

const HardCardPage: React.FC = () => {
  return (
    <Container fluid={true}>
      <OneCenteredColumn>
        <>
          <h4 className="text-primary mb-2">MPGA Hard Card</h4>
          <PolicyList policyCode={PolicyCodes.LocalRule} />
        </>
      </OneCenteredColumn>
    </Container>
  );
};

export default HardCardPage;
