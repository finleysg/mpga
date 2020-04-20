import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { routerMiddleware, routerReducer } from "react-router-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import constants from "./constants";
import { AppRoutes } from "./routes/AppRoutes";
import * as serviceWorker from "./serviceWorker";
import { IApplicationState, reducers } from "./store";

function buildRootReducer(reducers: any) {
    return combineReducers<IApplicationState>(Object.assign({}, reducers, { routing: routerReducer }));
}

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const initialState = (window as any).initialReduxState as IApplicationState;
const history = createBrowserHistory({ basename: "/" });
const store = createStore(
    buildRootReducer(reducers),
    initialState,
    composeEnhancers(
        applyMiddleware(thunk, routerMiddleware(history))
        // other store enhancers if any
    )
);

const stripePromise = loadStripe(constants.StripePublicKey);

function renderApp() {
    ReactDOM.render(
        <Provider store={store}>
            <Elements stripe={stripePromise}>
                <Router>
                    <AppRoutes />
                </Router>
            </Elements>
        </Provider>,
        document.getElementById("root")
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
renderApp();
serviceWorker.unregister();
