import { IContactData, IUserData } from "services/Data";

import constants from "../app-constants";
import { Api, Auth } from "../http";
import { PasswordResetRequest } from "../models/User";
import { IApplicationState } from "./index";
import NotificationActions from "./NotificationActions";

const userActionError = "Something went horribly wrong. We apologize for the error.";

export interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export enum UserActionTypes {
  GET_USER_REQUESTED = "GET_USER_REQUESTED",
  GET_USER_SUCCEEDED = "GET_USER_SUCCEEDED",
  GET_USER_FAILED = "GET_USER_FAILED",
  GET_CONTACT_ROLES_SUCCEEDED = "GET_CONTACT_ROLES_SUCCEEDED",
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
  ACTIVATE_ACCOUNT_REQUESTED = "ACTIVATE_ACCOUNT_REQUESTED",
  ACTIVATE_ACCOUNT_SUCCEEDED = "ACTIVATE_ACCOUNT_SUCCEEDED",
  ACTIVATE_ACCOUNT_FAILED = "ACTIVATE_ACCOUNT_FAILED",
  UPDATE_USER_REQUESTED = "UPDATE_USER_REQUESTED",
  UPDATE_USER_SUCCEEDED = "UPDATE_USER_SUCCEEDED",
  UPDATE_USER_FAILED = "UPDATE_USER_FAILED",
  GET_CONTACT_REQUESTED = "GET_CONTACT_REQUESTED",
  GET_CONTACT_SUCCEEDED = "GET_CONTACT_SUCCEEDED",
  GET_CONTACT_FAILED = "GET_CONTACT_FAILED",
  SAVE_CONTACT_REQUESTED = "SAVE_CONTACT_REQUESTED",
  SAVE_CONTACT_SUCCEEDED = "SAVE_CONTACT_SUCCEEDED",
  SAVE_CONTACT_FAILED = "SAVE_CONTACT_FAILED",
}

const UserActions = {
  GetUser: () => async (dispatch: any) => {
    dispatch({ type: UserActionTypes.GET_USER_REQUESTED });
    try {
      const result = await Auth.get("/users/me/");
      if (result && result.data) {
        const user = result.data as IUserData;
        dispatch({ type: UserActionTypes.GET_USER_SUCCEEDED, payload: user });
        dispatch(UserActions.GetUserContactRoles(user.email));
      } else {
        dispatch(UserActions.ResetUser());
      }
    } catch (error) {
      dispatch(UserActions.ResetUser());
    }
  },

  GetUserContactRoles: (email: string) => async (dispatch: any) => {
    try {
      const result = await Api.get("/contact-roles/?email=" + email);
      dispatch({ type: UserActionTypes.GET_CONTACT_ROLES_SUCCEEDED, payload: result.data });
    } catch (error) {
      // TODO: log error
    }
  },

  Login: (email: string, password: string, remember: boolean) => async (dispatch: any) => {
    dispatch({ type: UserActionTypes.LOGIN_REQUESTED });
    try {
      const result = await Auth.post("/token/login/", { username: email, email: email, password: password });
      const token = result.data.auth_token;
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
      await Auth.post("/token/logout/", {});
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
      await Auth.post("/users/reset_password/", { email: email });
    } finally {
      dispatch({ type: UserActionTypes.RESET_PASSWORD_COMPLETED });
    }
  },

  ConfirmReset: (reset: PasswordResetRequest) => async (dispatch: any) => {
    dispatch({ type: UserActionTypes.CONFIRM_PASSWORD_RESET_REQUESTED });
    try {
      await Auth.post("/users/reset_password_confirm/", reset.toJson());
      dispatch({ type: UserActionTypes.CONFIRM_PASSWORD_RESET_SUCCEEDED });
    } catch (error) {
      dispatch(NotificationActions.ToastError(error));
      dispatch({
        type: UserActionTypes.CONFIRM_PASSWORD_RESET_FAILED,
        payload: userActionError,
      });
    }
  },

  ChangePassword: (currentPassword: string, password1: string, password2: string) => async (dispatch: any) => {
    dispatch({ type: UserActionTypes.CHANGE_PASSWORD_REQUESTED });
    try {
      await Auth.post("/users/set_password/", {
        current_password: currentPassword,
        new_password: password1,
        re_new_password: password2,
      });
      dispatch({ type: UserActionTypes.CHANGE_PASSWORD_SUCCEEDED });
      dispatch(NotificationActions.ToastSuccess("Your password has been changed."));
    } catch (error) {
      dispatch(NotificationActions.ToastError(`${error}: Invalid password!`));
      dispatch({ type: UserActionTypes.CHANGE_PASSWORD_FAILED, payload: userActionError });
    }
  },

  CreateAccount: (registration: IRegisterData) => async (dispatch: any) => {
    dispatch({ type: UserActionTypes.CREATE_USER_REQUESTED, payload: registration });
    const accountRequest = {
      email: registration.email,
      first_name: registration.firstName,
      last_name: registration.lastName,
      password: registration.password,
      re_password: registration.confirmPassword,
    };
    try {
      await Auth.post("/users/", accountRequest);
      dispatch({ type: UserActionTypes.CREATE_USER_SUCCEEDED });
    } catch (error) {
      if (error?.response?.data && error.response.data[0] === "user already exists") {
        dispatch({ type: UserActionTypes.CREATE_USER_FAILED, payload: "user already exists" });
      } else {
        dispatch(NotificationActions.ToastError(error));
        dispatch({ type: UserActionTypes.CREATE_USER_FAILED, payload: userActionError });
      }
    }
  },

  ActivateAccount: (uid: string, token: string) => async (dispatch: any) => {
    dispatch({ type: UserActionTypes.ACTIVATE_ACCOUNT_REQUESTED });
    try {
      await Auth.post("/users/activation/", { uid: uid, token: token });
      dispatch({ type: UserActionTypes.ACTIVATE_ACCOUNT_SUCCEEDED });
    } catch (error) {
      dispatch(NotificationActions.ToastError(error));
      dispatch({ type: UserActionTypes.ACTIVATE_ACCOUNT_FAILED, payload: userActionError });
    }
  },

  UpdateAccount: (partial: any) => async (dispatch: any) => {
    dispatch({ type: UserActionTypes.UPDATE_USER_REQUESTED });
    try {
      await Auth.patch("/users/me/", partial);
      dispatch({ type: UserActionTypes.UPDATE_USER_SUCCEEDED });
      dispatch(UserActions.GetUser());
      dispatch(NotificationActions.ToastSuccess("Your account has been updated."));
    } catch (error) {
      dispatch(NotificationActions.ToastError(error));
      dispatch({ type: UserActionTypes.UPDATE_USER_FAILED, payload: userActionError });
    }
  },

  LoadContact: (email: string) => async (dispatch: any) => {
    dispatch({ type: UserActionTypes.GET_CONTACT_REQUESTED });
    try {
      const result = await Api.get(`/contacts/?email=${email}`);
      dispatch({ type: UserActionTypes.GET_CONTACT_SUCCEEDED, payload: result.data[0] as IContactData });
    } catch (error) {
      dispatch({ type: UserActionTypes.GET_CONTACT_FAILED, payload: userActionError });
      dispatch(NotificationActions.ToastError(error));
    }
  },

  UpdateContact: (id: number, partial: any) => async (dispatch: any, getState: () => IApplicationState) => {
    dispatch({ type: UserActionTypes.SAVE_CONTACT_REQUESTED });
    try {
      await Api.patch(`/contacts/${id}/`, partial);
      const user = getState().session.user;
      dispatch(UserActions.LoadContact(user.email));
      dispatch({ type: UserActionTypes.SAVE_CONTACT_SUCCEEDED });
      dispatch(NotificationActions.ToastSuccess("Your account has been updated."));
    } catch (error) {
      dispatch({ type: UserActionTypes.SAVE_CONTACT_FAILED, payload: userActionError });
      dispatch(NotificationActions.ToastError(error));
    }
  },
};

export default UserActions;
