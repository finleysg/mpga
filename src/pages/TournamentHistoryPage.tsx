import React from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';

import LargeLeftSmallRight from '../components/layouts/LargeLeftSmallRight';
import TournamentHistoryDetail from '../features/tournaments/TournamentHistoryDetail';
import TournamentHistoryList from '../features/tournaments/TournamentHistoryList';

const TournamentHistoryPage: React.FC = () => {
    let { name } = useParams();

    return (
        <Container fluid={true}>
            <LargeLeftSmallRight
                Column1={
                    <div>
                        {name && <TournamentHistoryDetail tournamentName={name} />}
                        {name && <TournamentHistoryList tournamentName={name} />}
                    </div>
                }
                Column2={"Lists"}
            />
        </Container>
    );
}

export default TournamentHistoryPage
