import React from "react";
import Container from "react-bootstrap/Container";
import {PolicyCodes} from "../constants";
import PolicyList from "../features/content/PolicyList";
import TwoEvenColumns from "../components/layouts/TwoEvenColumns";
import TournamentList from "../features/tournaments/TournamentList";

const TournamentsPage: React.FC = () => {
    return (
        <Container fluid={true}>
            <TwoEvenColumns
                LeftColumn={
                    <>
                        <h3 className="text-primary mb-2">Tournaments</h3>
                        <TournamentList />
                    </>
                }
                RightColumn={
                    <>
                        <h3 className="text-primary mb-2">Tournament Policies</h3>
                        <PolicyList policyCode={PolicyCodes.TournamentPlayerInformation} />
                    </>}
            />
        </Container>
    );
};

export default TournamentsPage;
