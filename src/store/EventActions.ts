import constants from '../constants';
import { Api } from '../http';
import { EventDetail } from '../models/Events';
import NotificationActions from './NotificationActions';

export enum EventActionTypes {
    GET_EVENTS_REQUESTED = "GET_EVENTS_REQUESTED",
    GET_EVENTS_SUCCEEDED = "GET_EVENTS_SUCCEEDED",
    GET_EVENTS_FAILED = "GET_EVENTS_FAILED",
};

const eventUrl = constants.ApiUrl + "/events/";

const EventActions = {
    LoadEvents: () => async (dispatch: any) => {
        dispatch({ type: EventActionTypes.GET_EVENTS_REQUESTED});
        try {
            const result = await Api.get(eventUrl + "?year=" + constants.EventCalendarYear.toString());
            const data = result.data.map((json: any) => new EventDetail(json));
            dispatch({ type: EventActionTypes.GET_EVENTS_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: EventActionTypes.GET_EVENTS_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    }
}

export default EventActions;
