import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import OneSmallColumn from "../components/layouts/OneSmallColumn";
import ForgotPassword from "../features/session/ForgotPassword";
import Login from "../features/session/Login";
import Register from "../features/session/Register";
import { ConnectedLayout } from "../layout/Layout";
import PasswordReset from "../features/session/PasswordReset";

export const SessionRoutes: React.FC = () => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <ConnectedLayout>
                <Route exact path={path}>
                    <p>Account Page</p>
                </Route>
                <Route path={`${path}/login`}>
                    <OneSmallColumn>
                        <Login />
                    </OneSmallColumn>
                </Route>
                <Route path={`${path}/forgot`}>
                    <OneSmallColumn>
                        <ForgotPassword />
                    </OneSmallColumn>
                </Route>
                <Route path={`${path}/register`}>
                    <OneSmallColumn>
                        <Register />
                    </OneSmallColumn>
                </Route>
                <Route path={`${path}/reset-password/:uid/:token`}>
                    <OneSmallColumn>
                        <PasswordReset />
                    </OneSmallColumn>
                </Route>
            </ConnectedLayout>
        </Switch>
    );
};
