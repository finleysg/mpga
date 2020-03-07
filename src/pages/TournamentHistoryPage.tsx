import React from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';

import LargeLeftSmallRight from '../components/layouts/LargeLeftSmallRight';
import TournamentHistoryList from '../features/tournaments/TournamentHistoryList';

const TournamentHistoryPage: React.FC = () => {
    let { name } = useParams();

    return (
        <Container fluid={true}>
            <LargeLeftSmallRight
                Column1={
                    <div>
                        <h3 className="text-primary mb-2">Past Champions</h3>
                        {name && <TournamentHistoryList tournamentName={name} />}
                    </div>
                }
                Column2={"Lists"}
            />
        </Container>
    );
}

export default TournamentHistoryPage
