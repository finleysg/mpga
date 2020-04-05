import React from 'react';
import SmallLeftLargeRight from '../components/layouts/SmallLeftLargeRight';
import PageContentDetail from '../features/content/PageContentDetail';
import { PageCodes } from '../constants';
import { TeamList } from '../features/match-play/TeamList';

const MatchPlayPage: React.FC = () => {
    return (
        <SmallLeftLargeRight
            LeftColumn={<PageContentDetail pageCode={PageCodes.MatchPlay} />}
            RightColumn={
                <React.Fragment>
                    <h3 className="text-primary">2020 Match Play Teams</h3>
                    <TeamList />
                </React.Fragment>
            }
        />
    );
}

export default MatchPlayPage;