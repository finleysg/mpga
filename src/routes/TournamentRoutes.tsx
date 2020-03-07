import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ConnectedLayout } from '../layout/Layout';
import TournamentsPage from '../pages/TournamentsPage';
import TournamentHistoryPage from '../pages/TournamentHistoryPage';
import HardCardPage from "../pages/HardCardPage";
import CodeOfConductPage from "../pages/CodeOfConductPage";
import TournamentGalleryPage from '../pages/TournamentGalleryPage';
import PaceOfPlayPage from '../pages/PaceOfPlayPage';

export const TournamentRoutes: React.FC = () => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <ConnectedLayout>
                <Route exact path={path}>
                    <TournamentsPage />
                </Route>
                <Route exact path={`${path}/hard-card`}>
                    <HardCardPage />
                </Route>
                <Route exact path={`${path}/code-of-conduct`}>
                    <CodeOfConductPage />
                </Route>
                <Route exact path={`${path}/pace-of-play`}>
                    <PaceOfPlayPage />
                </Route>
                <Route exact path={`${path}/t/:name`}>
                    <p>tournament name here</p>
                </Route>
                <Route exact path={`${path}/t/:name/history`}>
                    <TournamentHistoryPage />
                </Route>
                <Route exact path={`${path}/t/:name/gallery`}>
                    <TournamentGalleryPage />
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
