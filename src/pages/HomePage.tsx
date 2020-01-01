import React from 'react';
import Container from 'react-bootstrap/Container';

import ThreeEvenColumns from '../components/layouts/ThreeEvenColumns';
import { PageCodes, PolicyCodes } from '../constants';
import AnnouncementList from '../features/announcements/AnnouncementList';
import PageContentDetail from '../features/content/PageContentDetail';
import PolicyList from '../features/content/PolicyList';
import TournamentCalendar from '../features/tournaments/TournamentCalendar';

const HomePage: React.FC = () => {
    return (
        <Container fluid={true}>
            <ThreeEvenColumns
                Column1={<AnnouncementList />}
                Column2={<TournamentCalendar />}
                Column3={
                    <>
                        <PageContentDetail pageCode={PageCodes.Home} />
                        <PolicyList policyCode={PolicyCodes.AboutUs} />
                    </>}
            />
        </Container>
    );
}

export default HomePage
