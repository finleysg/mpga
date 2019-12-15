import { Action } from "redux";
import { Reducer } from "react";
import { Announcement } from "../models/Announcement";

export enum AnnouncementActionTypes {
    GET_ANNOUNCEMENTS_REQUESTED = "GET_ANNOUNCEMENTS_REQUESTED",
    GET_ANNOUNCEMENTS_SUCCEEDED = "GET_ANNOUNCEMENTS_SUCCEEDED",
    GET_ANNOUNCEMENTS_FAILED = "GET_ANNOUNCEMENTS_FAILED",
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
    payload: any; // TODO: error object
}

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

type KnownActions = IAnnouncementsRequested | IAnnouncementsSucceeded | IAnnouncementsFailed;

export const AnnouncementsReducer: Reducer<IAnnouncementState, KnownActions> =
    (state: IAnnouncementState, action: KnownActions): IAnnouncementState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case AnnouncementActionTypes.GET_ANNOUNCEMENTS_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case AnnouncementActionTypes.GET_ANNOUNCEMENTS_SUCCEEDED: {
            return {...state, data: action.payload, isBusy: false};
        }
        case AnnouncementActionTypes.GET_ANNOUNCEMENTS_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
    }
}