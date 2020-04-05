import React from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';

import LargeLeftSmallRight from '../components/layouts/LargeLeftSmallRight';
import TournamentLoader from '../features/tournaments/TournamentLoader';
import TournamentHistoryTable from '../features/tournaments/TournamentHistoryTable';

const TournamentHistoryPage: React.FC = () => {
    let { name } = useParams();

    return (
        <Container fluid={true}>
            <LargeLeftSmallRight
                LeftColumn={
                    <React.Fragment>
                        <TournamentLoader name={name || ""} />
                        <TournamentHistoryTable />
                    </React.Fragment>
                }
                RightColumn={"Lists"}
            />
        </Container>
    );
}

export default TournamentHistoryPage
