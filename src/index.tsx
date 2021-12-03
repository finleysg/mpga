import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as Sentry from '@sentry/browser';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import React from 'react';
import ReactDOM from 'react-dom';

import { AxiosResponse } from 'axios';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from './app-store';
import constants from './constants';
import { Api } from './http';
import { AppRoutes } from './routes/AppRoutes';
import * as serviceWorker from './serviceWorker';
import { UserActionTypes } from './store/UserActions';

Api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            sessionStorage.removeItem(constants.BearerTokenName);
            localStorage.removeItem(constants.BearerTokenName);
            store.dispatch({ type: UserActionTypes.RESET_USER });
        } else {
            Sentry.captureException(error);
            throw error;
        }
    }
);

const stripePromise = loadStripe(constants.StripePublicKey);

Sentry.init({ dsn: "https://73c06439a90442629476cfcb5d92f0c3@o59115.ingest.sentry.io/5214360" });

function renderApp() {
    ReactDOM.render(
        <Elements stripe={stripePromise}>
            <Provider store={store}>
                <Router>
                    <AppRoutes />
                </Router>
            </Provider>
        </Elements>,
        document.getElementById("root")
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
renderApp();
serviceWorker.unregister();
