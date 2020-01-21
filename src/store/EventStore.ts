import { Action, Reducer } from 'redux';

import { EventDetail } from '../models/Events';
import { EventActionTypes } from './EventActions';

export interface IEventState {
    events: EventDetail[];
    isBusy: boolean;
    hasError: boolean;
}

export const defaultState: IEventState = {
    events: [],
    isBusy: false,
    hasError: false,
};

export interface IEventsGetRequested extends Action {
    type: EventActionTypes.GET_EVENTS_REQUESTED;
}

export interface IEventsGetSucceeded extends Action {
    type: EventActionTypes.GET_EVENTS_SUCCEEDED;
    payload: EventDetail[];
}

export interface IEventsGetFailed extends Action {
    type: EventActionTypes.GET_EVENTS_FAILED;
}

type KnownActions = IEventsGetRequested | IEventsGetSucceeded | IEventsGetFailed;

export const EventsReducer: Reducer<IEventState, KnownActions> =
    (state: IEventState | undefined, action: KnownActions): IEventState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case EventActionTypes.GET_EVENTS_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case EventActionTypes.GET_EVENTS_SUCCEEDED: {
            return {...state, events: action.payload, isBusy: false};
        }
        case EventActionTypes.GET_EVENTS_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        default:
            return state;
    }
}
