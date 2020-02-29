import React from "react";
import Container from "react-bootstrap/Container";
import EventCalendar from "../features/tournaments/EventCalendar";
import {PolicyCodes} from "../constants";
import PolicyList from "../features/content/PolicyList";
import TwoEvenColumns from "../components/layouts/TwoEvenColumns";

const TournamentsPage: React.FC = () => {
    return (
        <Container fluid={true}>
            <TwoEvenColumns
                LeftColumn={<EventCalendar />}
                RightColumn={
                    <>
                        <h4 className="text-primary mb-2">Tournament Players Information</h4>
                        <PolicyList policyCode={PolicyCodes.TournamentPlayerInformation} />
                    </>}
            />
        </Container>
    );
};

export default TournamentsPage;
