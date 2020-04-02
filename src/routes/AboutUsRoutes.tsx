import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ConnectedLayout } from '../layout/Layout';
import AboutUsPage from '../pages/AboutUsPage';
import CommitteePage from '../pages/CommitteePage';
import AwardsPage from '../pages/AwardsPage';

export const AboutUsRoutes: React.FC = () => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <ConnectedLayout>
                <Route exact path={path}>
                    <AboutUsPage />
                </Route>
                <Route path={`${path}/committee`}>
                    <CommitteePage />
                </Route>
                <Route path={`${path}/awards`}>
                    <AwardsPage />
                </Route>
            </ConnectedLayout>
        </Switch>
    );
};
