import { Action, Reducer } from "redux";

import { AppActionTypes } from "./AppActions";
import { AppConfig } from "../models/AppConfig";

export interface IAppState {
    config: AppConfig;
    isBusy: boolean;
    editMode: boolean;
    closedForms: string[];
    location?: string;
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
    editMode: false,
    closedForms: [],
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

export interface IAppSaveLocation extends Action {
    type: AppActionTypes.SAVE_LOCATION;
    payload: string;
}

export interface IAppToggleEditMode extends Action {
    type: AppActionTypes.TOGGLE_EDIT_MODE;
}
export interface IAppCloseOpenForm extends Action {
    type: AppActionTypes.CLOSE_OPEN_FORMS;
    payload: string;
}

type KnownActions =
    | IAppConfigsGetSucceeded
    | IAppBusy
    | IAppNotBusy
    | IAppSaveLocation
    | IAppToggleEditMode
    | IAppCloseOpenForm;

export const AppReducer: Reducer<IAppState, KnownActions> = (
    state: IAppState | undefined,
    action: KnownActions
): IAppState => {
    if (!state) {
        state = { ...defaultState };
    }

    switch (action.type) {
        case AppActionTypes.IS_BUSY: {
            return { ...state, isBusy: true };
        }
        case AppActionTypes.IS_NOT_BUSY: {
            return { ...state, isBusy: false };
        }
        case AppActionTypes.GET_CONFIG_SUCCEEDED: {
            return { ...state, config: action.payload as AppConfig };
        }
        case AppActionTypes.SAVE_LOCATION: {
            return { ...state, location: action.payload };
        }
        case AppActionTypes.TOGGLE_EDIT_MODE: {
            return { ...state, editMode: !state.editMode };
        }
        case AppActionTypes.CLOSE_OPEN_FORMS: {
            const forms = state.closedForms.slice(0);
            forms.unshift(action.payload);
            return { ...state, closedForms: forms };
        }
        default:
            return state;
    }
};
