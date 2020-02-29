import React from "react";
import Container from "react-bootstrap/Container";
import EventCalendar from "../features/tournaments/EventCalendar";
import {PolicyCodes} from "../constants";
import PolicyList from "../features/content/PolicyList";
import TwoEvenColumns from "../components/layouts/TwoEvenColumns";
import OneCenteredColumn from "../components/layouts/OneCenteredColumn";

const CodeOfConductPage: React.FC = () => {
    return (
        <Container fluid={true}>
            <OneCenteredColumn>
                <>
                    <h4 className="text-primary mb-2">MPGA Code of Conduct</h4>
                    <PolicyList policyCode={PolicyCodes.CodeOfConduct} />
                </>
            </OneCenteredColumn>
        </Container>
    );
};

export default CodeOfConductPage;
