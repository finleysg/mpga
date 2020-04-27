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

const parseError = (err: any): string => {
    let message: string;
    if (err.error !== undefined) {
        if (err.status === 0) {
            message = `Could not reach the mpga server because your internet connection 
                        was lost, the connection timed out, or the server is not responding.`;
        } else {
            const body = err.error || {};
            if (body.non_field_errors) {
                // django-rest-auth
                message = body.non_field_errors[0];
            } else if (body.username) {
                // django-rest-auth
                message = body.username[0];
            } else if (body.detail) {
                // django-rest-framework
                message = body.detail;
            } else {
                message = JSON.stringify(body);
            }
        }
    } else {
        message = err.message ? err.message : err.toString();
    }
    return message;
};

const NotificationActions = {
    ToastMessage: (message: string) => (dispatch: any) => {
        toast("Information", message, NotificationType.Information)(dispatch);
    },
    ToastSuccess: (message: string) => (dispatch: any) => {
        toast("Success", message, NotificationType.Success)(dispatch);
    },
    ToastError: (error: any) => (dispatch: any) => {
        const message = parseError(error);
        toast("Error", message || "An error occurred", NotificationType.Error)(dispatch);
    },
    RemoveToast: (id: number) => (dispatch: any) => {
        dispatch({
            type: NotificationActionTypes.REMOVE_NOTIFICATION,
            payload: id
        });
    }
};

export default NotificationActions;
