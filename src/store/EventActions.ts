import moment from 'moment';

import constants from '../constants';
import { Api } from '../http';
import { EventDetail, EventLink, EventPoints, EventPolicy } from '../models/Events';
import { IApplicationState } from './';
import NotificationActions from './NotificationActions';

export enum EventActionTypes {
    EVENT_DATA_REQUESTED = "EVENT_DATA_REQUESTED",
    EVENT_DATA_FAILED = "EVENT_DATA_FAILED",
    GET_EVENTS_SUCCEEDED = "GET_EVENTS_SUCCEEDED",
    GET_EVENT_SUCCEEDED = "GET_EVENT_SUCCEEDED",
    SAVE_EVENT_SUCCEEDED = "SAVE_EVENT_SUCCEEDED",
    ADD_NEW_EVENT_LINK = "ADD_NEW_EVENT_LINK",
    CANCEL_NEW_EVENT_LINK = "CANCEL_NEW_EVENT_LINK",
    SAVE_EVENT_LINK_SUCCEEDED = "SAVE_EVENT_LINK_SUCCEEDED",
    DELETE_EVENT_LINK_SUCCEEDED = "DELETE_EVENT_LINK_SUCCEEDED",
    ADD_NEW_EVENT_POINTS = "ADD_NEW_EVENT_POINTS",
    CANCEL_NEW_EVENT_POINTS = "CANCEL_NEW_EVENT_POINTS",
    SAVE_EVENT_POINTS_SUCCEEDED = "SAVE_EVENT_POINTS_SUCCEEDED",
    DELETE_EVENT_POINTS_SUCCEEDED = "DELETE_EVENT_POINTS_SUCCEEDED",
    ADD_NEW_EVENT_POLICY = "ADD_NEW_EVENT_POLICY",
    CANCEL_NEW_EVENT_POLICY = "CANCEL_NEW_EVENT_POLICY",
    SAVE_EVENT_POLICY_SUCCEEDED = "SAVE_EVENT_POLICY_SUCCEEDED",
    REMOVE_EVENT_POLICY_SUCCEEDED = "REMOVE_EVENT_POLICY_SUCCEEDED",
}

const eventUrl = constants.ApiUrl + "/events/";
const eventLinkUrl = constants.ApiUrl + "/event-links/";
const eventPointsUrl = constants.ApiUrl + "/event-points/";
const eventPolicyUrl = constants.ApiUrl + "/event-policies/";

const prepareEvent = (evt: EventDetail): any => {
    return {
        id: evt.id,
        location: evt.location?.id,
        tournament: evt.tournament?.id,
        name: evt.name,
        description: evt.description,
        rounds: evt.rounds,
        notes: evt.notes,
        event_type: evt.eventType,
        start_date: moment(evt.startDate).format("YYYY-MM-DD"),
        registration_start: evt.registrationStart,
        registration_end: evt.registrationEnd,
        early_registration_end: evt.earlyRegistrationEnd,
    };
}

const eventYear = (evt: EventDetail): any => {
    const start = moment(evt.startDate);
    return start.year();
}

const EventActions = {
    LoadEvents: () => async (dispatch: any) => {
        dispatch({ type: EventActionTypes.EVENT_DATA_REQUESTED });
        try {
            const result = await Api.get(eventUrl + "?year=" + constants.EventCalendarYear.toString());
            const data = result.data.map((json: any) => new EventDetail(json));
            dispatch({ type: EventActionTypes.GET_EVENTS_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: EventActionTypes.EVENT_DATA_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    LoadEvent: (systemName: string, year: number) => async (dispatch: any) => {
        dispatch({ type: EventActionTypes.EVENT_DATA_REQUESTED });
        try {
            const result = await Api.get(eventUrl + "?name=" + systemName + "&year=" + year.toString());
            const data = new EventDetail(result.data[0]);
            dispatch({ type: EventActionTypes.GET_EVENT_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: EventActionTypes.EVENT_DATA_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    SaveEvent: (eventDetail: EventDetail) => async (dispatch: any) => {
        dispatch({ type: EventActionTypes.EVENT_DATA_REQUESTED });
        try {
            const payload = prepareEvent(eventDetail);
            if (!eventDetail.id) {
                await Api.post(eventUrl, payload);
            } else {
                await Api.put(`${eventUrl}${eventDetail.id}/`, payload);
            }
            dispatch({ type: EventActionTypes.SAVE_EVENT_SUCCEEDED });
            dispatch(EventActions.LoadEvent(eventDetail.tournament?.systemName!, eventYear(eventDetail)));
            dispatch(NotificationActions.ToastSuccess(`${eventDetail.name} has been saved.`));
        } catch (error) {
            dispatch({ type: EventActionTypes.EVENT_DATA_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    AddNewEventLink: (linkType: string) => async (dispatch: any) => {
        dispatch({ type: EventActionTypes.ADD_NEW_EVENT_LINK, payload: linkType });
    },
    CancelNewEventLink: () => async (dispatch: any) => {
        dispatch({ type: EventActionTypes.CANCEL_NEW_EVENT_LINK });
    },
    SaveEventLink: (eventLink: EventLink) => async (dispatch: any, getState: () => IApplicationState) => {
        const currentEvent = getState().events.currentEvent;
        dispatch({ type: EventActionTypes.EVENT_DATA_REQUESTED });
        try {
            const payload = eventLink.prepJson();
            if (!eventLink.id) {
                await Api.post(eventLinkUrl, payload);
            } else {
                await Api.put(`${eventLinkUrl}${eventLink.id}/`, payload);
            }
            dispatch({ type: EventActionTypes.SAVE_EVENT_LINK_SUCCEEDED });
            dispatch(EventActions.LoadEvent(currentEvent.tournament?.systemName!, currentEvent.eventYear));
            dispatch(NotificationActions.ToastSuccess(`${eventLink.title} has been saved.`));
        } catch (error) {
            dispatch({ type: EventActionTypes.EVENT_DATA_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    DeleteEventLink: (eventLink: EventLink) => async (dispatch: any, getState: () => IApplicationState) => {
        const currentEvent = getState().events.currentEvent;
        dispatch({ type: EventActionTypes.EVENT_DATA_REQUESTED });
        try {
            await Api.delete(`${eventLinkUrl}${eventLink.id}/`);
            dispatch({ type: EventActionTypes.DELETE_EVENT_LINK_SUCCEEDED });
            dispatch(EventActions.LoadEvent(currentEvent.tournament?.systemName!, currentEvent.eventYear));
            dispatch(NotificationActions.ToastSuccess(`${eventLink.title} has been deleted.`));
        } catch (error) {
            dispatch({ type: EventActionTypes.EVENT_DATA_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    AddNewEventPoints: () => async (dispatch: any) => {
        dispatch({ type: EventActionTypes.ADD_NEW_EVENT_POINTS });
    },
    CancelNewEventPoints: () => async (dispatch: any) => {
        dispatch({ type: EventActionTypes.CANCEL_NEW_EVENT_POINTS });
    },
    SaveEventPoints: (eventPoints: EventPoints) => async (dispatch: any, getState: () => IApplicationState) => {
        const currentEvent = getState().events.currentEvent;
        dispatch({ type: EventActionTypes.EVENT_DATA_REQUESTED });
        try {
            const payload = eventPoints.prepJson();
            if (!eventPoints.id) {
                await Api.post(eventPointsUrl, payload);
            } else {
                await Api.put(`${eventPointsUrl}${eventPoints.id}/`, payload);
            }
            dispatch({ type: EventActionTypes.SAVE_EVENT_POINTS_SUCCEEDED });
            dispatch(EventActions.LoadEvent(currentEvent.tournament?.systemName!, currentEvent.eventYear));
            dispatch(NotificationActions.ToastSuccess(`${eventPoints.ordinalPlace} place has been saved.`));
        } catch (error) {
            dispatch({ type: EventActionTypes.EVENT_DATA_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    DeleteEventPoints: (eventPoints: EventPoints) => async (dispatch: any, getState: () => IApplicationState) => {
        const currentEvent = getState().events.currentEvent;
        dispatch({ type: EventActionTypes.EVENT_DATA_REQUESTED });
        try {
            await Api.delete(`${eventPointsUrl}${eventPoints.id}/`);
            dispatch({ type: EventActionTypes.DELETE_EVENT_POINTS_SUCCEEDED });
            dispatch(EventActions.LoadEvent(currentEvent.tournament?.systemName!, currentEvent.eventYear));
            dispatch(NotificationActions.ToastSuccess(`${eventPoints.ordinalPlace} place has been deleted.`));
        } catch (error) {
            dispatch({ type: EventActionTypes.EVENT_DATA_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    AddNewEventPolicy: () => async (dispatch: any) => {
        dispatch({ type: EventActionTypes.ADD_NEW_EVENT_POLICY });
    },
    CancelNewEventPolicy: () => async (dispatch: any) => {
        dispatch({ type: EventActionTypes.CANCEL_NEW_EVENT_POLICY });
    },
    SaveEventPolicy: (eventPolicy: EventPolicy) => async (dispatch: any, getState: () => IApplicationState) => {
        const currentEvent = getState().events.currentEvent;
        dispatch({ type: EventActionTypes.EVENT_DATA_REQUESTED });
        try {
            const payload = eventPolicy.prepJson();
            if (!eventPolicy.id) {
                await Api.post(eventPolicyUrl, payload);
            } else {
                await Api.put(`${eventPolicyUrl}${eventPolicy.id}/`, payload);
            }
            dispatch({ type: EventActionTypes.SAVE_EVENT_POLICY_SUCCEEDED });
            dispatch(EventActions.LoadEvent(currentEvent.tournament?.systemName!, currentEvent.eventYear));
            dispatch(NotificationActions.ToastSuccess(`${eventPolicy.policy?.name} has been saved.`));
        } catch (error) {
            dispatch({ type: EventActionTypes.EVENT_DATA_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    RemoveEventPolicy: (eventPolicy: EventPolicy) => async (dispatch: any, getState: () => IApplicationState) => {
        const currentEvent = getState().events.currentEvent;
        dispatch({ type: EventActionTypes.EVENT_DATA_REQUESTED });
        try {
            await Api.delete(`${eventPolicyUrl}${eventPolicy.id}/`);
            dispatch({ type: EventActionTypes.REMOVE_EVENT_POLICY_SUCCEEDED });
            dispatch(EventActions.LoadEvent(currentEvent.tournament?.systemName!, currentEvent.eventYear));
            dispatch(NotificationActions.ToastSuccess(`${eventPolicy.policy?.name} has been removed.`));
        } catch (error) {
            dispatch({ type: EventActionTypes.EVENT_DATA_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    }
};

export default EventActions;