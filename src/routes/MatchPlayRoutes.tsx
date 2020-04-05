import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { ConnectedLayout } from "../layout/Layout";
import MatchPlayPage from "../pages/MatchPlayPage";
import MatchPlayResultsPage from "../pages/MatchPlayResultsPage";
import MatchPlayRulesPage from "../pages/MatchPlayRulesPage";
import MatchPlayHistoryPage from '../pages/MatchPlayHistoryPage';

export const MatchPlayRoutes: React.FC = () => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <ConnectedLayout>
                <Route exact path={path}>
                    <MatchPlayPage />
                </Route>
                <Route path={`${path}/rules`}>
                    <MatchPlayRulesPage />
                </Route>
                <Route path={`${path}/results`}>
                    <MatchPlayResultsPage />
                </Route>
                <Route path={`${path}/history`}>
                    <MatchPlayHistoryPage />
                </Route>
            </ConnectedLayout>
        </Switch>
    );
};
