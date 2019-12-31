import { Api } from '../http';
import { Announcement } from '../models/Announcement';
import NotificationActions from './NotificationActions';

export enum AnnouncementActionTypes {
    APPEND_ANNOUNCEMENT = "APPEND_ANNOUNCEMENT",
    CANCEL_NEW_ANNOUNCEMENT = "CANCEL_NEW_ANNOUNCEMENT",
    GET_ANNOUNCEMENTS_REQUESTED = "GET_ANNOUNCEMENTS_REQUESTED",
    GET_ANNOUNCEMENTS_SUCCEEDED = "GET_ANNOUNCEMENTS_SUCCEEDED",
    GET_ANNOUNCEMENTS_FAILED = "GET_ANNOUNCEMENTS_FAILED",
    SAVE_ANNOUNCEMENT_REQUESTED = "SAVE_ANNOUNCEMENT_REQUESTED",
    SAVE_ANNOUNCEMENT_SUCCEEDED = "SAVE_ANNOUNCEMENT_SUCCEEDED",
    SAVE_ANNOUNCEMENT_FAILED = "SAVE_ANNOUNCEMENT_FAILED",
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
        dispatch({ type: AnnouncementActionTypes.GET_ANNOUNCEMENTS_REQUESTED});
        try {
            const result = await Api.get(url);
            const data = result.data.map((json: any) => new Announcement(json));
            dispatch({ type: AnnouncementActionTypes.GET_ANNOUNCEMENTS_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: AnnouncementActionTypes.GET_ANNOUNCEMENTS_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },

    Save: (announcement: Announcement) => async (dispatch: any) => {
        dispatch({ type: AnnouncementActionTypes.SAVE_ANNOUNCEMENT_REQUESTED});
        try {
            const payload = announcement.prepJson();
            if (announcement.document && announcement.document.id) {
                payload.document = announcement.document.prepJson();
            } else {
                payload.document = null;
            }
            if (!announcement.id) {
                await Api.post(url, payload);
            } else {
                await Api.put(`${url}${announcement.id}/`, payload);
            }
            dispatch({ type: AnnouncementActionTypes.SAVE_ANNOUNCEMENT_SUCCEEDED });
            dispatch(AnnouncementActions.Load());
            dispatch(NotificationActions.ToastSuccess(`${announcement.title} has been saved.`))
        } catch (error) {
            dispatch({ type: AnnouncementActionTypes.SAVE_ANNOUNCEMENT_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    }
}

export default AnnouncementActions;
