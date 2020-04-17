import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import ConnectedLayout from '../layout/Layout';
import ContactUsPage from '../pages/ContactUsPage';
import ConnectedHomePage from '../pages/HomePage';
import UserActions from '../store/UserActions';
import { AboutUsRoutes } from './AboutUsRoutes';
import { MatchPlayRoutes } from './MatchPlayRoutes';
import { MemberClubRoutes } from './MemberClubRoutes';
import { TournamentRoutes } from './TournamentRoutes';
import { AdminRoutes } from "./AdminRoutes";
import { SessionRoutes } from "./SessionRoutes";

export const AppRoutes: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(
        () => {
          dispatch(UserActions.GetUser())
        },
        [dispatch]
    );
    return (
        <Switch>
            <Route exact path="/">
                <ConnectedLayout>
                    <ConnectedHomePage />
                </ConnectedLayout>
            </Route>
            <Route path="/tournaments">
                <TournamentRoutes />
            </Route>
            <Route path="/match-play">
                <MatchPlayRoutes />
            </Route>
            <Route path="/clubs">
                <MemberClubRoutes />
            </Route>
            <Route path="/about">
                <AboutUsRoutes />
            </Route>
            <Route path="/contact">
                <ConnectedLayout>
                    <ContactUsPage />
                </ConnectedLayout>
            </Route>
            <Route path="/admin">
                <AdminRoutes />
            </Route>
            <Route path="/account">
                <SessionRoutes />
            </Route>
        </Switch>
    );
};
