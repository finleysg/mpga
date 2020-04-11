import constants from "../constants";
import { Api, Auth } from "../http";
import { PasswordResetRequest, User } from "../models/User";
import NotificationActions from "./NotificationActions";
import { Contact } from "../models/Clubs";

const userActionError = "Something went horribly wrong. We apologize for the error.";

export interface IRegisterData {
    firstName: string;
    lastName: string;
    email: string;
    homeClub?: number;
    notes?: string;
    password?: string;
    confirmPassword?: string;
}

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
    SAVE_CONTACT_REQUESTED = "SAVE_CONTACT_REQUESTED",
    SAVE_CONTACT_SUCCEEDED = "SAVE_CONTACT_SUCCEEDED",
    SAVE_CONTACT_FAILED = "SAVE_CONTACT_FAILED",
}

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

    Login: (email: string, password: string, remember: boolean) => async (dispatch: any) => {
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

    ConfirmReset: (reset: PasswordResetRequest) => async (dispatch: any) => {
        dispatch({ type: UserActionTypes.CONFIRM_PASSWORD_RESET_REQUESTED });
        try {
            await Auth.post("/password/reset/confirm/", reset.toJson());
            dispatch({ type: UserActionTypes.CONFIRM_PASSWORD_RESET_SUCCEEDED });
        } catch (error) {
            dispatch(NotificationActions.ToastError(error));
            dispatch({
                type: UserActionTypes.CONFIRM_PASSWORD_RESET_FAILED,
                payload: userActionError,
            });
        }
    },

    ChangePassword: (password1: string, password2: string) => async (dispatch: any) => {
        dispatch({ type: UserActionTypes.CHANGE_PASSWORD_REQUESTED });
        try {
            await Auth.post("/password/change/", {
                new_password1: password1,
                new_password2: password2,
            });
            dispatch({ type: UserActionTypes.CHANGE_PASSWORD_SUCCEEDED });
        } catch (error) {
            dispatch({ type: UserActionTypes.CHANGE_PASSWORD_FAILED, payload: userActionError });
        }
    },

    CreateAccount: (registration: IRegisterData, contact?: Contact) => async (dispatch: any) => {
        dispatch({ type: UserActionTypes.CREATE_USER_REQUESTED, payload: registration });
        const accountRequest = {
            email: registration.email,
            username: registration.email,
            password1: registration.password,
            password2: registration.confirmPassword,
        };
        try {
            await Auth.post("/registration/", accountRequest);
            if (contact) {
                dispatch(UserActions.SaveContact(contact));
            }
            dispatch({ type: UserActionTypes.CREATE_USER_SUCCEEDED });
        } catch (error) {
            dispatch(NotificationActions.ToastError(error));
            if (error.response?.data?.email && error.response?.data?.email[0]) {
                dispatch({ type: UserActionTypes.CREATE_USER_FAILED, payload: error.response?.data?.email[0] });
            } else {
                dispatch({ type: UserActionTypes.CREATE_USER_FAILED, payload: userActionError });
            }
        }
    },

    UpdateAccount: (partial: any) => async (dispatch: any) => {
        dispatch({ type: UserActionTypes.UPDATE_USER_REQUESTED });
        try {
            await Auth.patch("/user/", partial);
            dispatch({ type: UserActionTypes.UPDATE_USER_SUCCEEDED });
            dispatch(UserActions.GetUser());
        } catch (error) {
            dispatch(NotificationActions.ToastError(error));
            dispatch({ type: UserActionTypes.UPDATE_USER_FAILED, payload: userActionError });
        }
    },

    SaveContact: (contact: Contact) => async (dispatch: any) => {
        dispatch({ type: UserActionTypes.SAVE_CONTACT_REQUESTED });
        try {
            const payload = contact.prepJson();
            let toastAction = contact.id ? "updated" : "created";
            const result = !contact.id
                ? await Api.post("/contacts/", payload)
                : await Api.put(`/contacts/${contact.id}/`, payload);

            dispatch({ type: UserActionTypes.SAVE_CONTACT_SUCCEEDED, payload: new Contact(result.data) });
            dispatch(
                NotificationActions.ToastSuccess(
                    `Account for ${contact.firstName + " " + contact.lastName} has been ${toastAction}.`
                )
            );
        } catch (error) {
            dispatch({ type: UserActionTypes.SAVE_CONTACT_FAILED, payload: userActionError });
            dispatch(NotificationActions.ToastError(error));
        }
    },
};

export default UserActions;
