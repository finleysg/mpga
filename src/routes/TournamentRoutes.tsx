import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ConnectedLayout } from '../layout/Layout';
import TournamentsPage from '../pages/TournamentsPage';

export const TournamentRoutes: React.FC = () => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <ConnectedLayout>
                <Route exact path={path}>
                    <TournamentsPage />
                </Route>
                <Route path={`${path}/hard-card`}>
                    <p>Hard card</p>
                </Route>
                <Route path={`${path}/code-of-conduct`}>
                    <p>Code of Conduct</p>
                </Route>
                <Route path={`${path}/bid`}>
                    <p>Bid</p>
                </Route>
                <Route exact path={`${path}/:name`}>
                    <p>tournament name here</p>
                </Route>
                <Route exact path={`${path}/:name/history`}>
                    <p>tournament history</p>
                </Route>
                <Route exact path={`${path}/:name/gallery`}>
                    <p>tournament gallery</p>
                </Route>
                <Route exact path={`${path}/:name/contact`}>
                    <p>tournament contact</p>
                </Route>
            </ConnectedLayout>
        </Switch>
    );
};
