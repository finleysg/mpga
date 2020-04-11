import { Action, Reducer } from "redux";

import { User } from "../models/User";
import { UserActionTypes, IRegisterData } from "./UserActions";
import { Contact } from "../models/Clubs";

export interface IUserState {
    user: User;
    contact?: Contact;
    isBusy: boolean;
    hasError: boolean;
    hasAccountError: boolean;
    errorMessage?: string;
    pendingPasswordReset: boolean;
    passwordResetConfirmed: boolean;
    accountExists: boolean;
    accountRequest?: IRegisterData;
}

export const defaultState: IUserState = {
    user: User.Guest(),
    isBusy: false,
    hasError: false,
    hasAccountError: false,
    pendingPasswordReset: false,
    passwordResetConfirmed: false,
    accountExists: false,
};

export interface IUserGetRequested extends Action {
    type: UserActionTypes.GET_USER_REQUESTED;
}

export interface IUserGetSucceeded extends Action {
    type: UserActionTypes.GET_USER_SUCCEEDED;
    payload: User;
}

export interface IUserGetFailed extends Action {
    type: UserActionTypes.GET_USER_FAILED;
}

export interface ILoginRequested extends Action {
    type: UserActionTypes.LOGIN_REQUESTED;
}

export interface ILoginSucceeded extends Action {
    type: UserActionTypes.LOGIN_SUCCEEDED;
    payload: { token: string; remember: boolean };
}

export interface ILoginFailed extends Action {
    type: UserActionTypes.LOGIN_FAILED;
    payload: string;
}

export interface ICreateUserRequested extends Action {
    type: UserActionTypes.CREATE_USER_REQUESTED;
    payload: IRegisterData;
}

export interface ICreateUserSucceeded extends Action {
    type: UserActionTypes.CREATE_USER_SUCCEEDED;
    payload: User;
}

export interface ICreateUserFailed extends Action {
    type: UserActionTypes.CREATE_USER_FAILED;
    payload: string;
}

export interface ISaveContactRequested extends Action {
    type: UserActionTypes.SAVE_CONTACT_REQUESTED;
}

export interface ISaveContactSucceeded extends Action {
    type: UserActionTypes.SAVE_CONTACT_SUCCEEDED;
    payload: Contact;
}

export interface ISaveContactFailed extends Action {
    type: UserActionTypes.SAVE_CONTACT_FAILED;
    payload: string;
}

export interface IPasswordResetRequested extends Action {
    type: UserActionTypes.RESET_PASSWORD_REQUESTED;
}

export interface IPasswordResetCompleted extends Action {
    type: UserActionTypes.RESET_PASSWORD_COMPLETED;
}

export interface IConfirmPasswordResetRequested extends Action {
    type: UserActionTypes.CONFIRM_PASSWORD_RESET_REQUESTED;
}

export interface IConfirmPasswordResetSucceeded extends Action {
    type: UserActionTypes.CONFIRM_PASSWORD_RESET_SUCCEEDED;
}

export interface IConfirmPasswordResetFailed extends Action {
    type: UserActionTypes.CONFIRM_PASSWORD_RESET_FAILED;
    payload: string;
}

export interface IResetUser extends Action {
    type: UserActionTypes.RESET_USER;
}

type KnownActions =
    | IUserGetRequested
    | IUserGetSucceeded
    | IUserGetFailed
    | ILoginRequested
    | ILoginSucceeded
    | ILoginFailed
    | ICreateUserRequested
    | ICreateUserSucceeded
    | ICreateUserFailed
    | ISaveContactRequested
    | ISaveContactSucceeded
    | ISaveContactFailed
    | IPasswordResetRequested
    | IPasswordResetCompleted
    | IConfirmPasswordResetRequested
    | IConfirmPasswordResetSucceeded
    | IConfirmPasswordResetFailed
    | IResetUser;

export const UsersReducer: Reducer<IUserState, KnownActions> = (
    state: IUserState | undefined,
    action: KnownActions
): IUserState => {
    if (!state) {
        state = { ...defaultState };
    }

    switch (action.type) {
        case UserActionTypes.GET_USER_REQUESTED: {
            return { ...state, isBusy: true, hasError: false, errorMessage: undefined };
        }
        case UserActionTypes.GET_USER_SUCCEEDED: {
            return { ...state, user: action.payload, isBusy: false };
        }
        case UserActionTypes.GET_USER_FAILED: {
            return { ...state, isBusy: false, hasError: true };
        }
        case UserActionTypes.LOGIN_REQUESTED: {
            return { ...state, isBusy: true, hasError: false, errorMessage: undefined };
        }
        case UserActionTypes.LOGIN_SUCCEEDED: {
            return { ...state, isBusy: false };
        }
        case UserActionTypes.LOGIN_FAILED: {
            return { ...state, isBusy: false, hasError: true, errorMessage: action.payload };
        }
        case UserActionTypes.CREATE_USER_REQUESTED: {
            return {
                ...state,
                isBusy: true,
                hasAccountError: false,
                errorMessage: undefined,
                accountExists: false,
                accountRequest: action.payload,
            };
        }
        case UserActionTypes.CREATE_USER_SUCCEEDED: {
            return { ...state, isBusy: false };
        }
        case UserActionTypes.CREATE_USER_FAILED: {
            let exists = false;
            if (action.payload === "A user is already registered with this e-mail address.") {
                exists = true;
            }
            return { ...state, isBusy: false, hasAccountError: true, errorMessage: action.payload, accountExists: exists };
        }
        case UserActionTypes.SAVE_CONTACT_REQUESTED: {
            return { ...state, isBusy: true, hasError: false, errorMessage: undefined };
        }
        case UserActionTypes.SAVE_CONTACT_SUCCEEDED: {
            return { ...state, isBusy: false, contact: action.payload };
        }
        case UserActionTypes.SAVE_CONTACT_FAILED: {
            return { ...state, isBusy: false, hasError: true, errorMessage: action.payload };
        }
        case UserActionTypes.RESET_PASSWORD_REQUESTED: {
            return { ...state, isBusy: true, hasError: false, errorMessage: undefined, pendingPasswordReset: false };
        }
        case UserActionTypes.RESET_PASSWORD_COMPLETED: {
            return { ...state, isBusy: false, hasError: false, errorMessage: undefined, pendingPasswordReset: true };
        }
        case UserActionTypes.CONFIRM_PASSWORD_RESET_REQUESTED: {
            return { ...state, isBusy: true, hasError: false, errorMessage: undefined, passwordResetConfirmed: false };
        }
        case UserActionTypes.CONFIRM_PASSWORD_RESET_SUCCEEDED: {
            return { ...state, isBusy: false, hasError: false, errorMessage: undefined, passwordResetConfirmed: true };
        }
        case UserActionTypes.CONFIRM_PASSWORD_RESET_FAILED: {
            return {
                ...state,
                isBusy: false,
                hasError: true,
                errorMessage: action.payload,
                passwordResetConfirmed: false,
            };
        }
        case UserActionTypes.RESET_USER: {
            return { ...state, user: User.Guest(), isBusy: false };
        }
        default:
            return state;
    }
};
