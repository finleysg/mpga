import { Action, Reducer } from "redux";
import { NotificationActionTypes } from "./NotificationActions";

export enum NotificationType {
    Information,
    Success,
    Error,
}

export interface INotificationContent {
    id: number,
    type: NotificationType,
    title: string,
    body: string,
    visible: boolean,
}

export interface INotificationState {
    data: INotificationContent[],
};

export const defaultNotificationState: INotificationState = {
    data: []
};

export interface INotificationAppend extends Action {
    type: NotificationActionTypes.APPEND_NOTIFICATION;
    payload: INotificationContent;
}

export interface INotificationDismiss extends Action {
    type: NotificationActionTypes.REMOVE_NOTIFICATION;
    payload: number;
}

type KnownActions = INotificationAppend | INotificationDismiss;

export const NotificationReducer: Reducer<INotificationState, KnownActions> =
    (state: INotificationState | undefined, action: KnownActions): INotificationState => {

    if (!state) {
        state = {...defaultNotificationState};
    }

    switch (action.type) {
        case NotificationActionTypes.APPEND_NOTIFICATION: {
            const toasts = state.data;
            toasts.unshift(action.payload);
            return {...state, data: toasts }
        }
        case NotificationActionTypes.REMOVE_NOTIFICATION: {
            const idx = state.data.findIndex(t => t.id === action.payload);
            if (idx >= 0) {
                const toasts = state.data;
                toasts.splice(idx, 1);
                return {...state, data: toasts};
            }
            return {...state, }
        }
        default:
            return state;
    }
}
