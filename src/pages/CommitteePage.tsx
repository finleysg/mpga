import React from "react";

import Container from "react-bootstrap/Container";

import { PageCodes } from "../app-constants";
import ThreeEvenColumns from "../components/layouts/ThreeEvenColumns";
import PastPresidents from "../features/awards/PastPresidents";
import CommitteeList from "../features/committee/CommitteeList";
import PageContentDetail from "../features/content/PageContentDetail";

const CommitteePage: React.FC = () => {
  return (
    <Container fluid={true}>
      <ThreeEvenColumns
        Column1={<PageContentDetail pageCode={PageCodes.ExecutiveCommittee} />}
        Column2={<CommitteeList />}
        Column3={<PastPresidents />}
      />
    </Container>
  )
}

export default CommitteePage
