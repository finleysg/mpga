import React from 'react';
import Container from 'react-bootstrap/Container';

import ThreeEvenColumns from '../components/layouts/ThreeEvenColumns';
import AnnouncementList from '../features/announcements/AnnouncementList';
import HomeContent from '../features/content/HomeContent';
import HomePolicies from '../features/content/HomePolicies';
import TournamentCalendar from '../features/tournaments/TournamentCalendar';

const HomePage: React.FC = () => {
    return (
        <Container fluid={true}>
            <ThreeEvenColumns
                Column1={<AnnouncementList />}
                Column2={<TournamentCalendar />}
                Column3={
                    <>
                        <HomeContent />
                        <HomePolicies />
                    </>}
            />
        </Container>
    );
}

export default HomePage
