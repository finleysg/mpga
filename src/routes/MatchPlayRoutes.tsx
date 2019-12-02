import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ConnectedLayout } from '../layout/Layout';
import MatchPlayPage from '../pages/MatchPlayPage';

export const MatchPlayRoutes: React.FC = () => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <ConnectedLayout>
                <Route exact path={path}>
                    <MatchPlayPage />
                </Route>
                <Route path={`${path}/rules`}>
                    <p>Rules</p>
                </Route>
                <Route path={`${path}/register`}>
                    <p>Sign up</p>
                </Route>
                <Route path={`${path}/results`}>
                    <p>Past Results</p>
                </Route>
            </ConnectedLayout>
        </Switch>
    );
};
