import React from "react";
import Container from "react-bootstrap/Container";
import OneCenteredColumn from "../components/layouts/OneCenteredColumn";
import TournamentLoader from "../features/tournaments/TournamentLoader";
import MatchPlayHistoryTable from '../features/match-play/MatchPlayHistoryTable';

const MatchPlayHistoryPage: React.FC = () => {
    return (
        <Container fluid={true}>
            <OneCenteredColumn>
                <TournamentLoader name={"match-play"} />
                <MatchPlayHistoryTable />
            </OneCenteredColumn>
        </Container>
    );
};

export default MatchPlayHistoryPage;
