import { Action, Reducer } from 'redux';

import { User } from '../models/User';
import { UserActionTypes } from './UserActions';

export interface IUserState {
    user: User;
    isBusy: boolean;
    hasError: boolean;
    errorMessage?: string;
}

export const defaultState: IUserState = {
    user: User.Guest(),
    isBusy: false,
    hasError: false,
};

export interface IUserGetRequested extends Action {
    type: UserActionTypes.GET_USER_REQUESTED
}

export interface IUserGetSucceeded extends Action {
    type: UserActionTypes.GET_USER_SUCCEEDED;
    payload: User;
}

export interface IUserGetFailed extends Action {
    type: UserActionTypes.GET_USER_FAILED;
}

export interface ILoginRequested extends Action {
    type: UserActionTypes.LOGIN_REQUESTED
}

export interface ILoginSucceeded extends Action {
    type: UserActionTypes.LOGIN_SUCCEEDED;
    payload: {token: string, remember: boolean};
}

export interface ILoginFailed extends Action {
    type: UserActionTypes.LOGIN_FAILED;
    payload: string;
}

export interface IResetUser extends Action {
    type: UserActionTypes.RESET_USER;
}

type KnownActions = IUserGetRequested 
    | IUserGetSucceeded 
    | IUserGetFailed
    | ILoginRequested
    | ILoginSucceeded
    | ILoginFailed
    | IResetUser;

export const UsersReducer: Reducer<IUserState, KnownActions> =
    (state: IUserState | undefined, action: KnownActions): IUserState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case UserActionTypes.GET_USER_REQUESTED: {
            return {...state, isBusy: true, hasError: false, errorMessage: undefined};
        }
        case UserActionTypes.GET_USER_SUCCEEDED: {
            return {...state, user: action.payload, isBusy: false};
        }
        case UserActionTypes.GET_USER_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case UserActionTypes.LOGIN_REQUESTED: {
            return {...state, isBusy: true, hasError: false, errorMessage: undefined};
        }
        case UserActionTypes.LOGIN_SUCCEEDED: {
            return {...state, isBusy: false}
        }
        case UserActionTypes.LOGIN_FAILED: {
            return {...state, isBusy: false, hasError: true, errorMessage: action.payload};
        }
        case UserActionTypes.RESET_USER: {
            return {...state, user: User.Guest(), isBusy: false};
        }
        default:
            return state;
    }
}
