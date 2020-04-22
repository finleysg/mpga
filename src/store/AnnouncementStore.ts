import { Action, Reducer } from "redux";
import { Announcement } from "../models/Announcement";
import { AnnouncementActionTypes } from "./AnnouncementActions";

export interface IAnnouncementState {
    data: Announcement[];
}

export const defaultState: IAnnouncementState = {
    data: [],
};

export interface IAnnouncementAppend extends Action {
    type: AnnouncementActionTypes.APPEND_ANNOUNCEMENT;
}

export interface IAnnouncementCancel extends Action {
    type: AnnouncementActionTypes.CANCEL_NEW_ANNOUNCEMENT;
}

export interface IAnnouncementsSucceeded extends Action {
    type: AnnouncementActionTypes.GET_ANNOUNCEMENTS_SUCCEEDED;
    payload: Announcement[];
}

type KnownActions = IAnnouncementAppend | IAnnouncementCancel | IAnnouncementsSucceeded;

export const AnnouncementsReducer: Reducer<IAnnouncementState, KnownActions> = (
    state: IAnnouncementState | undefined,
    action: KnownActions
): IAnnouncementState => {
    if (!state) {
        state = { ...defaultState };
    }

    switch (action.type) {
        case AnnouncementActionTypes.APPEND_ANNOUNCEMENT: {
            const announcements = state.data;
            announcements.unshift(Announcement.Create());
            return { ...state, data: announcements };
        }
        case AnnouncementActionTypes.CANCEL_NEW_ANNOUNCEMENT: {
            const idx = state.data.findIndex((a) => a.id === 0);
            if (idx >= 0) {
                const announcements = state.data;
                announcements.splice(idx, 1);
                return { ...state, data: announcements };
            }
            return { ...state };
        }
        case AnnouncementActionTypes.GET_ANNOUNCEMENTS_SUCCEEDED: {
            return { ...state, data: action.payload };
        }
        default:
            return state;
    }
};
