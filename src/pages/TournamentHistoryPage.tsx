import React from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";

import NineThree from "../components/layouts/NineThree";
import TournamentHistoryTable from "../features/tournaments/TournamentHistoryTable";
import TournamentLoader from "../features/tournaments/TournamentLoader";
import TournamentResultList from "../features/tournaments/TournamentResultList";

const TournamentHistoryPage: React.FC = () => {
    const { name } = useParams();

    return (
        <Container fluid={true}>
            <TournamentLoader name={name || ""} resultDocuments={true} />
            <NineThree LeftColumn={<TournamentHistoryTable />} RightColumn={<TournamentResultList />} />
        </Container>
    );
};

export default TournamentHistoryPage;
