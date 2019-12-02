import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ConnectedLayout } from '../layout/Layout';
import AboutUsPage from '../pages/AboutUsPage';

export const AboutUsRoutes: React.FC = () => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <ConnectedLayout>
                <Route exact path={path}>
                    <AboutUsPage />
                </Route>
                <Route path={`${path}/committee`}>
                    <p>Executive Committee</p>
                </Route>
                <Route path={`${path}/awards`}>
                    <p>Awards</p>
                </Route>
                <Route path={`${path}/awards/:name`}>
                    <p>award name here</p>
                </Route>
                <Route path={`${path}/past-presidents`}>
                    <p>Past Presidents</p>
                </Route>
                <Route path={`${path}/history`}>
                    <p>History</p>
                </Route>
            </ConnectedLayout>
        </Switch>
    );
};
