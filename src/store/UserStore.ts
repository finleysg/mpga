import { Action, Reducer } from "redux";

import { User } from "../models/User";
import { UserActionTypes, IRegisterData } from "./UserActions";
import { Contact } from "../models/Clubs";

export interface IUserStateFlags {
    isBusy: boolean;
    hasError: boolean;
    errorMessage?: string;
    pendingPasswordReset: boolean;
    passwordResetConfirmed: boolean;
    accountExists: boolean;
    accountActivated: boolean;
    accountCreated: boolean;
}

export const defaultStateFlags: IUserStateFlags = {
    errorMessage: "",
    isBusy: false,
    hasError: false,
    pendingPasswordReset: false,
    passwordResetConfirmed: false,
    accountExists: false,
    accountActivated: false,
    accountCreated: false,
};

export interface IUserState {
    user: User;
    contact?: Contact;
    accountRequest?: IRegisterData;
    flags: IUserStateFlags;
}

export const defaultState: IUserState = {
    user: User.Guest(),
    flags: defaultStateFlags,
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

export interface IUserGetContactRolesSucceeded extends Action {
    type: UserActionTypes.GET_CONTACT_ROLES_SUCCEEDED;
    payload: any;
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

export interface IGetContactRequested extends Action {
    type: UserActionTypes.GET_CONTACT_REQUESTED;
}

export interface IGetContactSucceeded extends Action {
    type: UserActionTypes.GET_CONTACT_SUCCEEDED;
    payload: Contact;
}

export interface IGetContactFailed extends Action {
    type: UserActionTypes.GET_CONTACT_FAILED;
    payload: string;
}

export interface ISaveContactRequested extends Action {
    type: UserActionTypes.SAVE_CONTACT_REQUESTED;
}

export interface ISaveContactSucceeded extends Action {
    type: UserActionTypes.SAVE_CONTACT_SUCCEEDED;
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

export interface IActivateAccountRequested extends Action {
    type: UserActionTypes.ACTIVATE_ACCOUNT_REQUESTED;
}

export interface IActivateAccountSucceeded extends Action {
    type: UserActionTypes.ACTIVATE_ACCOUNT_SUCCEEDED;
}

export interface IActivateAccountFailed extends Action {
    type: UserActionTypes.ACTIVATE_ACCOUNT_FAILED;
    payload: string;
}

export interface IResetUser extends Action {
    type: UserActionTypes.RESET_USER;
}

type KnownActions =
    | IUserGetRequested
    | IUserGetSucceeded
    | IUserGetFailed
    | IUserGetContactRolesSucceeded
    | ILoginRequested
    | ILoginSucceeded
    | ILoginFailed
    | ICreateUserRequested
    | ICreateUserSucceeded
    | ICreateUserFailed
    | IGetContactRequested
    | IGetContactSucceeded
    | IGetContactFailed
    | ISaveContactRequested
    | ISaveContactSucceeded
    | ISaveContactFailed
    | IPasswordResetRequested
    | IPasswordResetCompleted
    | IConfirmPasswordResetRequested
    | IConfirmPasswordResetSucceeded
    | IConfirmPasswordResetFailed
    | IActivateAccountRequested
    | IActivateAccountSucceeded
    | IActivateAccountFailed
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
            return { ...state, flags: { ...defaultStateFlags, isBusy: true } };
        }
        case UserActionTypes.GET_USER_SUCCEEDED: {
            return { ...state, user: action.payload, flags: defaultStateFlags };
        }
        case UserActionTypes.GET_USER_FAILED: {
            return { ...state, flags: { ...defaultStateFlags, hasError: true } };
        }
        case UserActionTypes.GET_CONTACT_ROLES_SUCCEEDED: {
            const updatedUser = state.user;
            updatedUser.committeeId =
                action.payload.committee?.length > 0 ? action.payload.committee[0].id : undefined;
            updatedUser.clubId = 
                action.payload.club?.length > 0 ? action.payload.club[0].id : undefined;
            return { ...state, user: updatedUser };
        }
        case UserActionTypes.LOGIN_REQUESTED: {
            return { ...state, flags: { ...defaultStateFlags, isBusy: true } };
        }
        case UserActionTypes.LOGIN_SUCCEEDED: {
            return { ...state, flags: defaultStateFlags };
        }
        case UserActionTypes.LOGIN_FAILED: {
            return { ...state, flags: { ...defaultStateFlags, hasError: true, errorMessage: action.payload } };
        }
        case UserActionTypes.CREATE_USER_REQUESTED: {
            return { ...state, accountRequest: action.payload, flags: { ...defaultStateFlags, isBusy: true } };
        }
        case UserActionTypes.CREATE_USER_SUCCEEDED: {
            return { ...state, flags: { ...defaultStateFlags, accountCreated: true } };
        }
        case UserActionTypes.CREATE_USER_FAILED: {
            let exists = false;
            if (action.payload === "A user is already registered with this e-mail address.") {
                exists = true;
            }
            return {
                ...state,
                flags: {
                    ...defaultStateFlags,
                    accountExists: exists,
                    hasError: true,
                    errorMessage: action.payload,
                },
            };
        }
        case UserActionTypes.GET_CONTACT_REQUESTED: {
            return { ...state, flags: { ...defaultStateFlags, isBusy: true } };
        }
        case UserActionTypes.GET_CONTACT_SUCCEEDED: {
            return { ...state, contact: action.payload, flags: defaultStateFlags };
        }
        case UserActionTypes.GET_CONTACT_FAILED: {
            return { ...state, flags: { ...defaultStateFlags, hasError: true, errorMessage: action.payload } };
        }
        case UserActionTypes.SAVE_CONTACT_REQUESTED: {
            return { ...state, flags: { ...defaultStateFlags, isBusy: true } };
        }
        case UserActionTypes.SAVE_CONTACT_SUCCEEDED: {
            return { ...state, flags: defaultStateFlags };
        }
        case UserActionTypes.SAVE_CONTACT_FAILED: {
            return { ...state, flags: { ...defaultStateFlags, hasError: true, errorMessage: action.payload } };
        }
        case UserActionTypes.RESET_PASSWORD_REQUESTED: {
            return { ...state, flags: { ...defaultStateFlags, isBusy: true } };
        }
        case UserActionTypes.RESET_PASSWORD_COMPLETED: {
            return { ...state, flags: { ...defaultStateFlags, pendingPasswordReset: true } };
        }
        case UserActionTypes.CONFIRM_PASSWORD_RESET_REQUESTED: {
            return { ...state, flags: { ...defaultStateFlags, isBusy: true } };
        }
        case UserActionTypes.CONFIRM_PASSWORD_RESET_SUCCEEDED: {
            return { ...state, flags: { ...defaultStateFlags, passwordResetConfirmed: true } };
        }
        case UserActionTypes.CONFIRM_PASSWORD_RESET_FAILED: {
            return { ...state, flags: { ...defaultStateFlags, hasError: true, errorMessage: action.payload } };
        }
        case UserActionTypes.ACTIVATE_ACCOUNT_REQUESTED: {
            return { ...state, flags: { ...defaultStateFlags, isBusy: true } };
        }
        case UserActionTypes.ACTIVATE_ACCOUNT_SUCCEEDED: {
            return { ...state, flags: { ...defaultStateFlags, accountActivated: true } };
        }
        case UserActionTypes.ACTIVATE_ACCOUNT_FAILED: {
            return { ...state, flags: { ...defaultStateFlags, hasError: true, errorMessage: action.payload } };
        }
        case UserActionTypes.RESET_USER: {
            return { ...state, user: User.Guest(), flags: defaultStateFlags };
        }
        default:
            return state;
    }
};
