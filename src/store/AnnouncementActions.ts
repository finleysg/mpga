import { Api } from '../http';
import { Announcement } from "../models/Announcement";
import NotificationActions from './NotificationActions';
import AppActions from './AppActions';

export const AnnouncementForm: string = "announcement";

export enum AnnouncementActionTypes {
    APPEND_ANNOUNCEMENT = "APPEND_ANNOUNCEMENT",
    CANCEL_NEW_ANNOUNCEMENT = "CANCEL_NEW_ANNOUNCEMENT",
    GET_ANNOUNCEMENTS_SUCCEEDED = "GET_ANNOUNCEMENTS_SUCCEEDED",
};

const url = "/announcements/";

const AnnouncementActions = {
    AddNew: () => (dispatch: any) => {
        dispatch({type: AnnouncementActionTypes.APPEND_ANNOUNCEMENT});
    },

    CancelNew: () => (dispatch: any) => {
        dispatch({type: AnnouncementActionTypes.CANCEL_NEW_ANNOUNCEMENT});
    },

    Load: () => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const result = await Api.get(url);
            const data = result.data.map((json: any) => new Announcement(json));
            dispatch(AppActions.NotBusy());
            dispatch({ type: AnnouncementActionTypes.GET_ANNOUNCEMENTS_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },

    Save: (announcement: Announcement) => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const payload = announcement.toJson();
            if (!announcement.id) {
                await Api.post(url, payload);
            } else {
                await Api.put(`${url}${announcement.id}/`, payload);
            }
            dispatch(AppActions.NotBusy());
            dispatch(AppActions.CloseOpenForms(AnnouncementForm));
            dispatch(AnnouncementActions.Load());
            dispatch(NotificationActions.ToastSuccess(`${announcement.title} has been saved.`))
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    }
}

export default AnnouncementActions;
