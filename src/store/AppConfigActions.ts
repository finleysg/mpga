import axios from 'axios';

import constants from '../constants';
import { AppConfig } from '../models/AppConfig';
import NotificationActions from './NotificationActions';

export enum AppConfigActionTypes {
    GET_CONFIG_REQUESTED = "GET_CONFIG_REQUESTED",
    GET_CONFIG_SUCCEEDED = "GET_CONFIG_SUCCEEDED",
    GET_CONFIG_FAILED = "GET_CONFIG_FAILED",
};

const url = constants.ApiUrl + "/settings/";

const AppConfigActions = {
    Load: () => async (dispatch: any) => {
        dispatch({ type: AppConfigActionTypes.GET_CONFIG_REQUESTED});
        try {
            const result = await axios.get(url);
            const data = result.data.map((json: any) => new AppConfig(json));
            dispatch({ type: AppConfigActionTypes.GET_CONFIG_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: AppConfigActionTypes.GET_CONFIG_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
}

export default AppConfigActions;
