import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedLayout } from "../layout/Layout";
import ContactUsPage from "../pages/ContactUsPage";
import { TournamentRoutes } from "./TournamentRoutes";
import { MatchPlayRoutes } from "./MatchPlayRoutes";
import { MemberClubRoutes } from "./MemberClubRoutes";
import { AboutUsRoutes } from "./AboutUsRoutes";
import ConnectedHomePage from "../pages/HomePage";

export const AppRoutes: React.FC = () => {
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
        </Switch>
    );
};
