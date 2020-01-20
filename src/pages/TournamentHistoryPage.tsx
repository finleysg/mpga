import React from 'react';
import Container from 'react-bootstrap/Container';

import LargeLeftSmallRight from '../components/layouts/LargeLeftSmallRight';
import { useParams } from 'react-router-dom';

const TournamentHistoryPage: React.FC = () => {
    let { name } = useParams();
    return (
        <Container fluid={true}>
            <LargeLeftSmallRight
                Column1={
                    <div>
                        {name}
                    </div>
                }
                Column2={"Lists"}
            />
        </Container>
    );
}

export default TournamentHistoryPage
