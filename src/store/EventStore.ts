import { Action, Reducer } from "redux";

import { EventDetail, EventLink, EventPoints, EventPolicy } from "../models/Events";
import { EventActionTypes } from "./EventActions";
import { Policy } from "../models/Policies";

export interface IEventState {
    events: EventDetail[];
    currentEvent: EventDetail;
    isBusy: boolean;
    hasError: boolean;
}

export const defaultState: IEventState = {
    events: [],
    currentEvent: new EventDetail({}),
    isBusy: false,
    hasError: false,
};

export interface IEventDataRequested extends Action {
    type: EventActionTypes.EVENT_DATA_REQUESTED;
}

export interface IEventDataFailed extends Action {
    type: EventActionTypes.EVENT_DATA_FAILED;
}

export interface IEventsGetSucceeded extends Action {
    type: EventActionTypes.GET_EVENTS_SUCCEEDED;
    payload: EventDetail[];
}

export interface IEventGetSucceeded extends Action {
    type: EventActionTypes.GET_EVENT_SUCCEEDED;
    payload: EventDetail;
}

export interface ISaveEventSucceeded extends Action {
    type: EventActionTypes.SAVE_EVENT_SUCCEEDED;
}

export interface IAddNewEventLink extends Action {
    type: EventActionTypes.ADD_NEW_EVENT_LINK;
    payload: string;
}

export interface ICancelNewEventLink extends Action {
    type: EventActionTypes.CANCEL_NEW_EVENT_LINK;
}

export interface ISaveEventLinkSucceeded extends Action {
    type: EventActionTypes.SAVE_EVENT_LINK_SUCCEEDED;
}

export interface IDeleteEventLinkSucceeded extends Action {
    type: EventActionTypes.DELETE_EVENT_LINK_SUCCEEDED;
}

export interface IAddNewEventPoints extends Action {
    type: EventActionTypes.ADD_NEW_EVENT_POINTS;
}

export interface ICancelNewEventPoints extends Action {
    type: EventActionTypes.CANCEL_NEW_EVENT_POINTS;
}

export interface ISaveEventPointsSucceeded extends Action {
    type: EventActionTypes.SAVE_EVENT_POINTS_SUCCEEDED;
}

export interface IDeleteEventPointsSucceeded extends Action {
    type: EventActionTypes.DELETE_EVENT_POINTS_SUCCEEDED;
}

export interface IAddNewEventPolicy extends Action {
    type: EventActionTypes.ADD_NEW_EVENT_POLICY;
}

export interface ICancelNewEventPolicy extends Action {
    type: EventActionTypes.CANCEL_NEW_EVENT_POLICY;
}

export interface ISaveEventPolicySucceeded extends Action {
    type: EventActionTypes.SAVE_EVENT_POLICY_SUCCEEDED;
}

export interface IRemoveEventPolicySucceeded extends Action {
    type: EventActionTypes.REMOVE_EVENT_POLICY_SUCCEEDED;
}

type KnownActions =
    | IEventDataRequested
    | IEventDataFailed
    | IEventsGetSucceeded
    | IEventGetSucceeded
    | ISaveEventSucceeded
    | IAddNewEventLink
    | ICancelNewEventLink
    | ISaveEventLinkSucceeded
    | IDeleteEventLinkSucceeded
    | IAddNewEventPoints
    | ICancelNewEventPoints
    | ISaveEventPointsSucceeded
    | IDeleteEventPointsSucceeded
    | IAddNewEventPolicy
    | ICancelNewEventPolicy
    | ISaveEventPolicySucceeded
    | IRemoveEventPolicySucceeded;

export const EventsReducer: Reducer<IEventState, KnownActions> = (
    state: IEventState | undefined,
    action: KnownActions
): IEventState => {
    if (!state) {
        state = { ...defaultState };
    }

    switch (action.type) {
        case EventActionTypes.ADD_NEW_EVENT_LINK: {
            const currentEvent = state.currentEvent;
            const link = new EventLink({
                id: 0,
                event: currentEvent.id,
                linkType: action.payload,
            });
            if (!currentEvent.links) {
                currentEvent.links = [];
            }
            currentEvent.links.unshift(link);
            return { ...state, currentEvent: currentEvent };
        }
        case EventActionTypes.CANCEL_NEW_EVENT_LINK: {
            const currentEvent = state.currentEvent;
            const idx = currentEvent.links?.findIndex(l => l.id === 0) || 0;
            if (idx >= 0) {
                const links = currentEvent.links!;
                links.splice(idx, 1);
                currentEvent.links = links;
                return { ...state, currentEvent: currentEvent };
            }
            return { ...state };
        }
        case EventActionTypes.ADD_NEW_EVENT_POINTS: {
            const currentEvent = state.currentEvent;
            const points = new EventPoints();
            points.id = 0;
            points.event = currentEvent.id!;
            if (!currentEvent.playerPoints) {
                currentEvent.playerPoints = [];
            }
            currentEvent.playerPoints.push(points);
            return { ...state, currentEvent: currentEvent };
        }
        case EventActionTypes.CANCEL_NEW_EVENT_POINTS: {
            const currentEvent = state.currentEvent;
            const idx = currentEvent.playerPoints?.findIndex(p => p.id === 0) || 0;
            if (idx >= 0) {
                const playerPoints = currentEvent.playerPoints!;
                playerPoints.splice(idx, 1);
                currentEvent.playerPoints = playerPoints;
                return { ...state, currentEvent: currentEvent };
            }
            return { ...state };
        }
        case EventActionTypes.ADD_NEW_EVENT_POLICY: {
            const currentEvent = state.currentEvent;
            const policy = new EventPolicy({
                id: 0,
                event: currentEvent.id,
                order: currentEvent.policies?.length,
                policy: new Policy({ id: 0 }),
            });
            if (!currentEvent.policies) {
                currentEvent.policies = [];
            }
            currentEvent.policies.push(policy);
            return { ...state, currentEvent: currentEvent };
        }
        case EventActionTypes.CANCEL_NEW_EVENT_POLICY: {
            const currentEvent = state.currentEvent;
            const idx = currentEvent.policies?.findIndex(p => p.id === 0) || 0;
            if (idx >= 0) {
                const policies = currentEvent.policies!;
                policies.splice(idx, 1);
                currentEvent.policies = policies;
                return { ...state, currentEvent: currentEvent };
            }
            return { ...state };
        }
        case EventActionTypes.EVENT_DATA_REQUESTED: {
            return { ...state, isBusy: true, hasError: false };
        }
        case EventActionTypes.GET_EVENTS_SUCCEEDED: {
            return { ...state, events: action.payload, isBusy: false };
        }
        case EventActionTypes.GET_EVENT_SUCCEEDED: {
            return { ...state, currentEvent: action.payload, isBusy: false };
        }
        case EventActionTypes.SAVE_EVENT_SUCCEEDED:
        case EventActionTypes.SAVE_EVENT_LINK_SUCCEEDED:
        case EventActionTypes.SAVE_EVENT_POINTS_SUCCEEDED:
        case EventActionTypes.SAVE_EVENT_POLICY_SUCCEEDED: {
            return { ...state, isBusy: false };
        }
        case EventActionTypes.EVENT_DATA_FAILED: {
            return { ...state, isBusy: false, hasError: true };
        }
        default:
            return state;
    }
};
