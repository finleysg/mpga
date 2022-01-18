import React from "react";

import Container from "react-bootstrap/Container";

import { PageCodes } from "../app-constants";
import ThreeEvenColumns from "../components/layouts/ThreeEvenColumns";
import AwardDetail from "../features/awards/AwardDetail";
import useAwards from "../features/awards/UseAwards";
import CommitteeList from "../features/committee/CommitteeList";
import PageContentDetail from "../features/content/PageContentDetail";

const CommitteePage: React.FC = () => {
  const { awardMap } = useAwards();

  return (
    <Container fluid={true}>
      <ThreeEvenColumns
        Column1={<PageContentDetail pageCode={PageCodes.ExecutiveCommittee} />}
        Column2={<CommitteeList />}
        Column3={<AwardDetail awardId={awardMap["Past Presidents"]} />}
      />
    </Container>
  );
};

export default CommitteePage;
