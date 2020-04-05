import React from 'react';
import LargeLeftSmallRight from '../components/layouts/LargeLeftSmallRight';
import Container from 'react-bootstrap/Container';
import MemberClubList from '../features/members/MemberClubList';
import PageContentDetail from '../features/content/PageContentDetail';
import { PageCodes } from '../constants';

const MemberClubsPage: React.FC = () => {
    return (
        <Container fluid={true}>
            <LargeLeftSmallRight
                LeftColumn={
                    <div>
                        <PageContentDetail pageCode={PageCodes.MemberClubs} />
                        <MemberClubList />
                    </div>
                }
                RightColumn={"Interested in joining the MPGA?"}
            />
        </Container>
    );
}

export default MemberClubsPage;
