import { Action, Reducer } from 'redux';

import { AppConfigActionTypes } from './AppConfigActions';
import { AppConfig } from '../models/AppConfig';

export interface IAppConfigState {
    data: AppConfig;
    isBusy: boolean;
    hasError: boolean;
}

export const defaultState: IAppConfigState = {
    data: {
        eventCalendarYear: 0,
        matchPlayYear: 0,
        memberClubYear: 0,
        membershipDues: 0,
        stripePublicKey: "",    
    },
    isBusy: false,
    hasError: false,
};

export interface IAppConfigsGetRequested extends Action {
    type: AppConfigActionTypes.GET_CONFIG_REQUESTED;
}

export interface IAppConfigsGetSucceeded extends Action {
    type: AppConfigActionTypes.GET_CONFIG_SUCCEEDED;
    payload: AppConfig;
}

export interface IAppConfigsGetFailed extends Action {
    type: AppConfigActionTypes.GET_CONFIG_FAILED;
}

type KnownActions = IAppConfigsGetRequested 
    | IAppConfigsGetSucceeded 
    | IAppConfigsGetFailed;

export const AppConfigsReducer: Reducer<IAppConfigState, KnownActions> =
    (state: IAppConfigState | undefined, action: KnownActions): IAppConfigState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case AppConfigActionTypes.GET_CONFIG_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case AppConfigActionTypes.GET_CONFIG_SUCCEEDED: {
            return {...state, data: action.payload as AppConfig, isBusy: false};
        }
        case AppConfigActionTypes.GET_CONFIG_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        default:
            return state;
    }
}
