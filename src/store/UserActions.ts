import constants from '../constants';
import { Auth } from '../http';
import { PasswordReset, User } from '../models/User';
import NotificationActions from './NotificationActions';

export enum UserActionTypes {
    GET_USER_REQUESTED = "GET_USER_REQUESTED",
    GET_USER_SUCCEEDED = "GET_USER_SUCCEEDED",
    GET_USER_FAILED = "GET_USER_FAILED",
    LOGIN_REQUESTED = "LOGIN_REQUESTED",
    LOGIN_SUCCEEDED = "LOGIN_SUCCEEDED",
    LOGIN_FAILED = "LOGIN_FAILED",
    LOGOUT_REQUESTED = "LOGOUT_REQUESTED",
    LOGOUT_COMPLETED = "LOGOUT_COMPLETED",
    RESET_USER = "RESET_USER",
    RESET_PASSWORD_REQUESTED = "RESET_PASSWORD_REQUESTED",
    RESET_PASSWORD_COMPLETED = "RESET_PASSWORD_COMPLETED",
    CONFIRM_PASSWORD_RESET_REQUESTED = "CONFIRM_PASSWORD_RESET_REQUESTED",
    CONFIRM_PASSWORD_RESET_SUCCEEDED = "CONFIRM_PASSWORD_RESET_SUCCEEDED",
    CONFIRM_PASSWORD_RESET_FAILED = "CONFIRM_PASSWORD_RESET_FAILED",
    CHANGE_PASSWORD_REQUESTED = "CHANGE_PASSWORD_REQUESTED",
    CHANGE_PASSWORD_SUCCEEDED = "CHANGE_PASSWORD_SUCCEEDED",
    CHANGE_PASSWORD_FAILED = "CHANGE_PASSWORD_FAILED",
    CREATE_USER_REQUESTED = "CREATE_USER_REQUESTED",
    CREATE_USER_SUCCEEDED = "CREATE_USER_SUCCEEDED",
    CREATE_USER_FAILED = "CREATE_USER_FAILED",
    UPDATE_USER_REQUESTED = "UPDATE_USER_REQUESTED",
    UPDATE_USER_SUCCEEDED = "UPDATE_USER_SUCCEEDED",
    UPDATE_USER_FAILED = "UPDATE_USER_FAILED",
};

const UserActions = {

    GetUser: () => async (dispatch: any) => {
        dispatch({ type: UserActionTypes.GET_USER_REQUESTED });
        try {
            const result = await Auth.get("/user/");
            dispatch({ type: UserActionTypes.GET_USER_SUCCEEDED, payload: new User().fromJson(result.data) });
        } catch (error) {
            dispatch(UserActions.ResetUser());
        }
    },

    Login: (email: string, password: string, remember: boolean, history: any, redirectTo: any) => async (dispatch: any) => {
        dispatch({ type: UserActionTypes.LOGIN_REQUESTED });
        try {
            const result = await Auth.post("/login/", { username: email, email: email, password: password });
            const token = result.data.key;
            if (remember) {
                localStorage.setItem(constants.BearerTokenName, token);
            } else {
                sessionStorage.setItem(constants.BearerTokenName, token);
            }
            dispatch({ type: UserActionTypes.LOGIN_SUCCEEDED });
            dispatch(UserActions.GetUser());
            history.replace(redirectTo);
        } catch (error) {
            console.log("login error: " + error);
            dispatch({ type: UserActionTypes.LOGIN_FAILED, payload: "Email or password is invalid." });
        }
    },

    Logout: () => async (dispatch: any) => {
        try {
            await Auth.post("/logout/", {});
        } finally {
            dispatch(NotificationActions.ToastMessage("You have been logged out."));
            dispatch(UserActions.ResetUser());
        }
    },

    ResetUser: () => async (dispatch: any) => {
        sessionStorage.removeItem(constants.BearerTokenName);
        localStorage.removeItem(constants.BearerTokenName);
        dispatch({ type: UserActionTypes.RESET_USER });
    },

    ResetPassword: (email: string) => async (dispatch: any) => {
        dispatch({ type: UserActionTypes.RESET_PASSWORD_REQUESTED });
        try {
            await Auth.post("/password/reset/", { email: email });
        } finally {
            dispatch({ type: UserActionTypes.RESET_PASSWORD_COMPLETED });
        }
    },

    ConfirmReset: (reset: PasswordReset) => async (dispatch: any) => {
        dispatch({ type: UserActionTypes.CONFIRM_PASSWORD_RESET_REQUESTED });
        try {
            await Auth.post("/password/reset/confirm/", reset.toJson());
            dispatch({ type: UserActionTypes.CONFIRM_PASSWORD_RESET_SUCCEEDED });
        } catch (error) {
            dispatch({ type: UserActionTypes.CONFIRM_PASSWORD_RESET_FAILED });
        }
    },

    ChangePassword: (password1: string, password2: string) => async (dispatch: any) => {
        dispatch({ type: UserActionTypes.CHANGE_PASSWORD_REQUESTED });
        try {
            await Auth.post("/password/change/", {
                'new_password1': password1,
                'new_password2': password2
            });
            dispatch({ type: UserActionTypes.CHANGE_PASSWORD_SUCCEEDED });
        } catch (error) {
            dispatch({ type: UserActionTypes.CHANGE_PASSWORD_FAILED });
        }
    },

    CreateAccount: (newUser: User) => async (dispatch: any) => {
        dispatch({ type: UserActionTypes.CREATE_USER_REQUESTED });
        try {
            await Auth.post("/registration/", newUser.prepJson());
            dispatch({ type: UserActionTypes.CREATE_USER_SUCCEEDED });
        } catch (error) {
            dispatch({ type: UserActionTypes.CREATE_USER_FAILED });
        }
    },

    UpdateAccount: (partial: any) => async (dispatch: any) => {
        dispatch({ type: UserActionTypes.UPDATE_USER_REQUESTED });
        try {
            await Auth.patch("/user/", partial);
            dispatch({ type: UserActionTypes.UPDATE_USER_SUCCEEDED });
            dispatch(UserActions.GetUser())
        } catch (error) {
            dispatch({ type: UserActionTypes.UPDATE_USER_FAILED });
        }
    }
}

export default UserActions;
