import React from "react";
import Container from "react-bootstrap/Container";
import { PolicyCodes } from '../constants';
import OneCenteredColumn from "../components/layouts/OneCenteredColumn";
import PolicyList from '../features/content/PolicyList';

const PaceOfPlayPage: React.FC = () => {
    return (
        <Container fluid={true}>
            <OneCenteredColumn>
                <h3 className="text-primary mb-2">Pace of Play</h3>
                <PolicyList policyCode={PolicyCodes.PaceOfPlay} />
            </OneCenteredColumn>
        </Container>
    );
};

export default PaceOfPlayPage;
