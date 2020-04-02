import React from "react";
import Container from "react-bootstrap/Container";

import ThreeEvenColumns from "../components/layouts/ThreeEvenColumns";
import CommitteeList from "../features/committee/CommitteeList";
import PageContentDetail from "../features/content/PageContentDetail";
import { PageCodes } from "../constants";
import AwardDetail from '../features/awards/AwardDetail';

const CommitteePage: React.FC = () => {
    return (
        <Container fluid={true}>
            <ThreeEvenColumns 
                Column1={<PageContentDetail pageCode={PageCodes.ExecutiveCommittee} />} 
                Column2={<CommitteeList />} 
                Column3={<AwardDetail awardName="Past Presidents" />} 
            />
        </Container>
    );
};

export default CommitteePage;
