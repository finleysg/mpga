import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import {
  Route,
  Switch,
} from 'react-router-dom';

import constants from '../constants';
import ConnectedLayout from '../layout/Layout';
import ContactUsPage from '../pages/ContactUsPage';
import ConnectedHomePage from '../pages/HomePage';
import MaintenancePage from '../pages/MaintenancePage';
import UserActions from '../store/UserActions';
import { AboutUsRoutes } from './AboutUsRoutes';
import { AdminRoutes } from './AdminRoutes';
import { MatchPlayRoutes } from './MatchPlayRoutes';
import { MemberClubRoutes } from './MemberClubRoutes';
import { SessionRoutes } from './SessionRoutes';
import { TournamentRoutes } from './TournamentRoutes';

export const AppRoutes: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserActions.GetUser());
  }, [dispatch]);

  if (constants.MaintenanceMode) {
    return (
      <Switch>
        <Route path="*">
          <MaintenancePage />
        </Route>
      </Switch>
    );
  }
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
