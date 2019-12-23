import { Action, Reducer } from "redux";
import { Announcement } from "../models/Announcement";
import { AnnouncementActionTypes } from "./AnnouncementActions";

export interface IAnnouncementState {
    data: Announcement[];
    isBusy: boolean;
    hasError: boolean;
}

export const defaultState: IAnnouncementState = {
    data: [],
    isBusy: false,
    hasError: false,
};

export interface IAnnouncementAppend extends Action {
    type: AnnouncementActionTypes.APPEND_ANNOUNCEMENT;
}

export interface IAnnouncementCancel extends Action {
    type: AnnouncementActionTypes.CANCEL_NEW_ANNOUNCEMENT;
}

export interface IAnnouncementsRequested extends Action {
    type: AnnouncementActionTypes.GET_ANNOUNCEMENTS_REQUESTED;
}

export interface IAnnouncementsSucceeded extends Action {
    type: AnnouncementActionTypes.GET_ANNOUNCEMENTS_SUCCEEDED;
    payload: Announcement[];
}

export interface IAnnouncementsFailed extends Action {
    type: AnnouncementActionTypes.GET_ANNOUNCEMENTS_FAILED;
    // payload: object;
}

export interface IAnnouncementSaveRequested extends Action {
    type: AnnouncementActionTypes.SAVE_ANNOUNCEMENT_REQUESTED;
}

export interface IAnnouncementSaveSucceeded extends Action {
    type: AnnouncementActionTypes.SAVE_ANNOUNCEMENT_SUCCEEDED;
}

export interface IAnnouncementSaveFailed extends Action {
    type: AnnouncementActionTypes.SAVE_ANNOUNCEMENT_FAILED;
    // payload: object;
}

type KnownActions = IAnnouncementAppend 
    | IAnnouncementCancel
    | IAnnouncementsRequested 
    | IAnnouncementsSucceeded 
    | IAnnouncementsFailed
    | IAnnouncementSaveRequested
    | IAnnouncementSaveSucceeded
    | IAnnouncementSaveFailed;

export const AnnouncementsReducer: Reducer<IAnnouncementState, KnownActions> =
    (state: IAnnouncementState | undefined, action: KnownActions): IAnnouncementState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case AnnouncementActionTypes.APPEND_ANNOUNCEMENT: {
            const announcements = state.data;
            announcements.unshift(Announcement.Create());
            return {...state, data: announcements }
        }
        case AnnouncementActionTypes.CANCEL_NEW_ANNOUNCEMENT: {
            const idx = state.data.findIndex(a => a.id === 0);
            if (idx >= 0) {
                const announcements = state.data;
                announcements.splice(idx, 1);
                return {...state, data: announcements};
            }
            return {...state, }
        }
        case AnnouncementActionTypes.GET_ANNOUNCEMENTS_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case AnnouncementActionTypes.GET_ANNOUNCEMENTS_SUCCEEDED: {
            return {...state, data: action.payload, isBusy: false};
        }
        case AnnouncementActionTypes.GET_ANNOUNCEMENTS_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case AnnouncementActionTypes.SAVE_ANNOUNCEMENT_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case AnnouncementActionTypes.SAVE_ANNOUNCEMENT_SUCCEEDED: {
            return {...state, isBusy: false};
        }
        case AnnouncementActionTypes.SAVE_ANNOUNCEMENT_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        default:
            return state;
    }
}
