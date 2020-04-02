import { Action, Reducer } from 'redux';

import { AppActionTypes } from './AppActions';
import { AppConfig } from '../models/AppConfig';

export interface IAppState {
    config: AppConfig;
    isBusy: boolean;
}

export const defaultState: IAppState = {
    config: {
        eventCalendarYear: 0,
        matchPlayYear: 0,
        memberClubYear: 0,
        membershipDues: 0,
        stripePublicKey: "",    
    },
    isBusy: false,
};

export interface IAppBusy extends Action {
    type: AppActionTypes.IS_BUSY;
}
export interface IAppNotBusy extends Action {
    type: AppActionTypes.IS_NOT_BUSY;
}

export interface IAppConfigsGetRequested extends Action {
    type: AppActionTypes.GET_CONFIG_REQUESTED;
}
export interface IAppConfigsGetSucceeded extends Action {
    type: AppActionTypes.GET_CONFIG_SUCCEEDED;
    payload: AppConfig;
}
export interface IAppConfigsGetFailed extends Action {
    type: AppActionTypes.GET_CONFIG_FAILED;
}

type KnownActions =  
    | IAppConfigsGetSucceeded 
    | IAppBusy
    | IAppNotBusy;

export const AppReducer: Reducer<IAppState, KnownActions> =
    (state: IAppState | undefined, action: KnownActions): IAppState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case AppActionTypes.IS_BUSY: {
            return {...state, isBusy: true};
        }
        case AppActionTypes.IS_NOT_BUSY: {
            return {...state, isBusy: false};
        }
        case AppActionTypes.GET_CONFIG_SUCCEEDED: {
            return {...state, config: action.payload as AppConfig};
        }
        default:
            return state;
    }
}
