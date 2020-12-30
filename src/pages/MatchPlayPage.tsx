import React from 'react';

import SmallLeftLargeRight from '../components/layouts/SmallLeftLargeRight';
import constants, { PageCodes } from '../constants';
import PageContentDetail from '../features/content/PageContentDetail';

const MatchPlayPage: React.FC = () => {
    return (
        <SmallLeftLargeRight
            LeftColumn={<PageContentDetail pageCode={PageCodes.MatchPlay} />}
            RightColumn={
                <React.Fragment>
                    <h3 className="text-primary">{constants.MatchPlayYear} Match Play Teams</h3>
                    <p>Sign up procedures for 2021 are TBD</p>
                    {/* <TeamList /> */}
                </React.Fragment>
            }
        />
    );
};

export default MatchPlayPage;
