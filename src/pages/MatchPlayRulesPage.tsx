import React from "react";

import Container from "react-bootstrap/Container";

import { PolicyCodes } from "../app-constants";
import TwoEvenColumns from "../components/layouts/TwoEvenColumns";
import PolicyList from "../features/content/PolicyList";

const MatchPlayRulesPage: React.FC = () => {
  return (
    <Container fluid={true}>
      <TwoEvenColumns
        LeftColumn={
          <React.Fragment>
            <h3 className="text-primary mb-2">Match Play Rules</h3>
            <PolicyList policyCode={PolicyCodes.MatchPlay} />
          </React.Fragment>
        }
        RightColumn={
          <React.Fragment>
            <h3 className="text-primary mb-2">Senior Match Play Rules</h3>
            <PolicyList policyCode={PolicyCodes.SeniorMatchPlay} />
          </React.Fragment>
        }
      />
    </Container>
  );
};

export default MatchPlayRulesPage;
