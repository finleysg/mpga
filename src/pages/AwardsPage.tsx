import React from "react";
import Container from "react-bootstrap/Container";

import ThreeEvenColumns from "../components/layouts/ThreeEvenColumns";
import AwardDetail from '../features/awards/AwardDetail';

const AwardsPage: React.FC = () => {
    return (
        <Container fluid={true}>
            <ThreeEvenColumns 
                Column1={<AwardDetail awardName="Ron Self Award" />} 
                Column2={<AwardDetail awardName="Clasen Cup" />} 
                Column3={<AwardDetail awardName="Al Wareham Memorial" />} 
            />
        </Container>
    );
};

export default AwardsPage;
