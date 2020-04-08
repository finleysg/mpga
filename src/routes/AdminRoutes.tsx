import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ConnectedLayout } from '../layout/Layout';
import DocumentLibraryPage from "../pages/DocumentLibraryPage";

export const AdminRoutes: React.FC = () => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <ConnectedLayout>
                <Route path={`${path}/library`}>
                    <DocumentLibraryPage />
                </Route>
                <Route path={`${path}/reports`}>
                    <p>reports page</p>
                </Route>
                <Route path={`${path}/wiki`}>
                    <p>wiki page</p>
                </Route>
            </ConnectedLayout>
        </Switch>
    );
};
