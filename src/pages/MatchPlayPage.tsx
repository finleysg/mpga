import React from 'react';

import SmallLeftLargeRight from '../components/layouts/SmallLeftLargeRight';
import constants, { PageCodes } from '../constants';
import PageContentDetail from '../features/content/PageContentDetail';
import { TeamList } from '../features/match-play/TeamList';

const MatchPlayPage: React.FC = () => {
    return (
        <SmallLeftLargeRight
            LeftColumn={<PageContentDetail pageCode={PageCodes.MatchPlay} />}
            RightColumn={
                <React.Fragment>
                    <h3 className="text-primary">{constants.MatchPlayYear} Match Play Teams</h3>
                    {/* <div>
                        <iframe
                            title="2021-sign-up"
                            src="https://docs.google.com/forms/d/e/1FAIpQLSfISGwD9LJepombufKhw4l0wBZj2EkfP2RnlbbSRn_YeeIHeQ/viewform?embedded=true"
                            width="640"
                            height="1522"
                            frameBorder="0"
                            marginHeight={0}
                            marginWidth={0}>
                            Loading…
                        </iframe>
                    </div> */}
                    <TeamList />
                </React.Fragment>
            }
        />
    );
};

export default MatchPlayPage;
