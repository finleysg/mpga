import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import SessionLayout from "../components/layouts/SessionLayout";
import ForgotPassword from "../features/session/ForgotPassword";
import Login from "../features/session/Login";
import Register from "../features/session/Register";
import { ConnectedLayout } from "../layout/Layout";
import PasswordReset from "../features/session/PasswordReset";
import AccountActivation from "../features/session/AccountActivation";
import AccountDetail from "../features/account/AccountDetail";

export const SessionRoutes: React.FC = () => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <ConnectedLayout>
                <Route exact path={path}>
                    <SessionLayout>
                        <AccountDetail />
                    </SessionLayout>
                </Route>
                <Route path={`${path}/login`}>
                    <SessionLayout>
                        <Login />
                    </SessionLayout>
                </Route>
                <Route path={`${path}/forgot`}>
                    <SessionLayout>
                        <ForgotPassword />
                    </SessionLayout>
                </Route>
                <Route path={`${path}/register`}>
                    <SessionLayout>
                        <Register />
                    </SessionLayout>
                </Route>
                <Route path={`${path}/reset-password/:uid/:token`}>
                    <SessionLayout>
                        <PasswordReset />
                    </SessionLayout>
                </Route>
                <Route path={`${path}/activate/:uid/:token`}>
                    <SessionLayout>
                        <AccountActivation />
                    </SessionLayout>
                </Route>
            </ConnectedLayout>
        </Switch>
    );
};
