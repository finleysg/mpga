import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ConnectedLayout } from '../layout/Layout';
import TournamentsPage from '../pages/TournamentsPage';
import TournamentHistoryPage from '../pages/TournamentHistoryPage';

export const TournamentRoutes: React.FC = () => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <ConnectedLayout>
                <Route exact path={path}>
                    <TournamentsPage />
                </Route>
                <Route exact path={`${path}/hard-card`}>
                    <p>Hard card</p>
                </Route>
                <Route exact path={`${path}/code-of-conduct`}>
                    <p>Code of Conduct</p>
                </Route>
                <Route exact path={`${path}/pace-of-play`}>
                    <p>Pace of Play</p>
                </Route>
                <Route exact path={`${path}/t/:name`}>
                    <p>tournament name here</p>
                </Route>
                <Route exact path={`${path}/t/:name/history`}>
                    <TournamentHistoryPage />
                </Route>
                <Route exact path={`${path}/t/:name/gallery`}>
                    <p>tournament gallery</p>
                </Route>
                <Route exact path={`${path}/t/:name/contact`}>
                    <p>tournament contact</p>
                </Route>
                <Route exact path={`${path}/t/:name/bid`}>
                    <p>Bid</p>
                </Route>
            </ConnectedLayout>
        </Switch>
    );
};
