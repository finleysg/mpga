import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ConnectedLayout } from '../layout/Layout';
import MemberClubsPage from '../pages/MemberClubsPage';
import MemberClubPage from '../pages/MemberClubPage';

export const MemberClubRoutes: React.FC = () => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <ConnectedLayout>
                <Route exact path={path}>
                    <MemberClubsPage />
                </Route>
                <Route exact path={`${path}/:name`}>
                    <MemberClubPage />
                </Route>
            </ConnectedLayout>
        </Switch>
    );
};
