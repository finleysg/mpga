import { createBrowserHistory } from 'history';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { IApplicationState, reducers } from './store/index';

function buildRootReducer(reducers: any) {
    return combineReducers<IApplicationState>(
        Object.assign({}, reducers, { routing: routerReducer })
    );
}

const composeEnhancers = composeWithDevTools({});

const initialState = (window as any).initialReduxState as IApplicationState;
const history = createBrowserHistory();

export const store = createStore(
    buildRootReducer(reducers),
    initialState,
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
