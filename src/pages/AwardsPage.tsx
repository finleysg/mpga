import React from "react";

import Container from "react-bootstrap/Container";

import ThreeEvenColumns from "../components/layouts/ThreeEvenColumns";
import AwardDetail from "../features/awards/AwardDetail";
import useAwards from "../features/awards/UseAwards";

const AwardsPage: React.FC = () => {
  const { awardMap, awards } = useAwards();
  const { isSuccess } = awards;

  return (
    <Container fluid={true}>
      {isSuccess && (
        <ThreeEvenColumns
          Column1={<AwardDetail awardId={awardMap["Ron Self Award"]} />}
          Column2={<AwardDetail awardId={awardMap["Clasen Cup"]} />}
          Column3={<AwardDetail awardId={awardMap["Al Wareham Memorial"]} />}
        />
      )}
    </Container>
  );
};

export default AwardsPage;
