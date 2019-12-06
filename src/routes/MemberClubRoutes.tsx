import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ConnectedLayout } from '../layout/Layout';
import MemberClubsPage from '../pages/MemberClubsPage';

export const MemberClubRoutes: React.FC = () => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <ConnectedLayout>
                <Route exact path={path}>
                    <MemberClubsPage />
                </Route>
                <Route path={`${path}/current`}>
                    <p>Current year members</p>
                </Route>
                <Route exact path={`${path}/m/:name`}>
                    <p>club name here</p>
                </Route>
                <Route exact path={`${path}/m/:name/register`}>
                    <p>club name here online registration</p>
                </Route>
                <Route exact path={`${path}/m/:name/edit`}>
                    <p>club name here club update</p>
                </Route>
            </ConnectedLayout>
        </Switch>
    );
};
