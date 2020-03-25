import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ConnectedLayout } from '../layout/Layout';
import TournamentsPage from '../pages/TournamentsPage';
import TournamentHistoryPage from '../pages/TournamentHistoryPage';
import HardCardPage from "../pages/HardCardPage";
import CodeOfConductPage from "../pages/CodeOfConductPage";
import TournamentGalleryPage from '../pages/TournamentGalleryPage';
import PaceOfPlayPage from '../pages/PaceOfPlayPage';
import EventDetailPage from '../pages/EventDetailPage';

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
                <Route exact path={`${path}/detail/:name/:year`}>
                    <EventDetailPage />
                </Route>
                <Route exact path={`${path}/history/:name`}>
                    <TournamentHistoryPage />
                </Route>
                <Route exact path={`${path}/gallery/:name`}>
                    <TournamentGalleryPage />
                </Route>
                <Route exact path={`${path}/gallery/:name/:year`}>
                    <TournamentGalleryPage />
                </Route>
                <Route exact path={`${path}/contact/:name`}>
                    <p>tournament contact</p>
                </Route>
                <Route exact path={`${path}/bid/:name`}>
                    <p>Bid</p>
                </Route>
            </ConnectedLayout>
        </Switch>
    );
};
