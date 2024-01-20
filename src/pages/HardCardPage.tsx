import React from "react"

import { PolicyCodes } from "app-constants"
import PolicyList from "features/content/PolicyList"
import { IDocumentSearch } from "features/documents/documentPropTypes"
import LatestOnly from "features/documents/LatestOnly"
import Container from "react-bootstrap/Container"

import OneCenteredColumn from "../components/layouts/OneCenteredColumn"

const HardCardPage: React.FC = () => {
  const query: IDocumentSearch = {
    key: "hard-card",
    documentTypes: ["Hard Card"],
  }

  return (
    <Container fluid={true}>
      <OneCenteredColumn>
        <h4 className="text-primary mb-2">MPGA Terms of Competition</h4>
        <LatestOnly query={query} />
        <p>
          Minnesota Public Golf Association (MPGA) tournament play is governed by the Rules of Golf
          and by the following Terms of Competition and Definitions. Any changes or additions to
          these will be supplied on a Notice to Players and/or supplemental Local Rules sheet at the
          specific championship site. Unless otherwise noted, the penalty for the breach of a Local
          Rule or Condition is the <strong>General Penalty</strong>:
        </p>
        <ul>
          <li>Match Play: Loss of hole</li>
          <li>Stroke Play: Two strokes</li>
        </ul>
        <PolicyList policyCode={PolicyCodes.LocalRule} />
        <div style={{ paddingLeft: "60px", paddingRight: "60px", textAlign: "center" }}>
          <p>
            <strong>
              The Minnesota Public Golf Association has adopted the Terms of Competition (with minor
              adjustments) as authorized by the Minnesota Golf Association’s Rules & Competitions
              and Executive Committees
            </strong>
          </p>
        </div>
      </OneCenteredColumn>
    </Container>
  )
}

export default HardCardPage
