import { NotificationType } from "./NotificationStore";

export enum NotificationActionTypes {
    APPEND_NOTIFICATION = "APPEND_NOTIFICATION",
    REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION",
};

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(100000));
};

const toast = (title: string, message: string, type: NotificationType) => (dispatch: any) => {
    dispatch({
        type: NotificationActionTypes.APPEND_NOTIFICATION,
        payload: {
            id: generateId(),
            type: type,
            title: title,
            body: message,
            visible: true,
        }
    });
};

const NotificationActions = {
    ToastMessage: (message: string) => (dispatch: any) => {
        toast("Information", message, NotificationType.Information)(dispatch);
    },
    ToastSuccess: (message: string) => (dispatch: any) => {
        toast("Success", message, NotificationType.Success)(dispatch);
    },
    ToastError: (error: any) => (dispatch: any) => {
        toast("Error", error.message || "An error occurred", NotificationType.Error)(dispatch);
    },
    RemoveToast: (id: number) => (dispatch: any) => {
        dispatch({
            type: NotificationActionTypes.REMOVE_NOTIFICATION,
            payload: id
        });
    }
};

export default NotificationActions;