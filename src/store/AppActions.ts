import axios from "axios";

import constants from "../app-constants";
import { AppConfig } from "../models/AppConfig";
import NotificationActions from "./NotificationActions";

export enum AppActionTypes {
  IS_BUSY = "IS_BUSY",
  IS_NOT_BUSY = "IS_NOT_BUSY",
  GET_CONFIG_REQUESTED = "GET_CONFIG_REQUESTED",
  GET_CONFIG_SUCCEEDED = "GET_CONFIG_SUCCEEDED",
  GET_CONFIG_FAILED = "GET_CONFIG_FAILED",
  SAVE_LOCATION = "SAVE_LOCATION",
  TOGGLE_EDIT_MODE = "TOGGLE_EDIT_MODE",
  CLOSE_OPEN_FORMS = "CLOSE_OPEN_FORMS",
}

const url = constants.ApiUrl + "/settings/";

const AppActions = {
  Busy: () => (dispatch: any) => dispatch({ type: AppActionTypes.IS_BUSY }),
  NotBusy: () => (dispatch: any) => dispatch({ type: AppActionTypes.IS_NOT_BUSY }),
  LoadConfig: () => async (dispatch: any) => {
    dispatch({ type: AppActionTypes.GET_CONFIG_REQUESTED });
    try {
      const result = await axios.get(url);
      const data = result.data.map((json: any) => new AppConfig(json));
      dispatch({ type: AppActionTypes.GET_CONFIG_SUCCEEDED, payload: data });
    } catch (error) {
      dispatch({ type: AppActionTypes.GET_CONFIG_FAILED });
      dispatch(NotificationActions.ToastError(error));
    }
  },
  SaveLocation: (path: string) => (dispatch: any) => dispatch({ type: AppActionTypes.SAVE_LOCATION, payload: path }),
  ToggleEditMode: () => (dispatch: any) => dispatch({ type: AppActionTypes.TOGGLE_EDIT_MODE }),
  CloseOpenForms: (name: string) => (dispatch: any) =>
    dispatch({ type: AppActionTypes.CLOSE_OPEN_FORMS, payload: name }),
};

export default AppActions;
