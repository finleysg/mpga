import { createBrowserHistory, History } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import {
    applyMiddleware, combineReducers, compose, createStore, Store, StoreEnhancerStoreCreator
} from 'redux';
import thunk from 'redux-thunk';

import { AppRoutes } from './routes/AppRoutes';
import * as serviceWorker from './serviceWorker';
import { IApplicationState, reducers } from './store';

function buildRootReducer(reducers: any) {
    return combineReducers<IApplicationState>(Object.assign({}, reducers, { routing: routerReducer }));
}

function configureStore(history: History, initialState?: IApplicationState) {
    // const windowIfDefined = typeof window === "undefined" ? null : window as any;
    // const devTools = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ as () => StoreEnhancer;
    const createStoreWithMiddleware = compose <StoreEnhancerStoreCreator<any>>(
        applyMiddleware(thunk, routerMiddleware(history)), 
        // devTools ? devTools() : <S>(next: StoreEnhancerStoreCreator<S>) => next,
    )(createStore);

    const allReducers = buildRootReducer(reducers);
    const store = createStoreWithMiddleware(allReducers, initialState) as Store<IApplicationState>;
    
    return store;
}

const initialState = (window as any).initialReduxState as IApplicationState;
const history = createBrowserHistory({ basename: "/" });
const store = configureStore(history, initialState);

function renderApp() {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <AppRoutes />
            </Router>
        </Provider>,
        document.getElementById('root')
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
renderApp();
serviceWorker.unregister();
