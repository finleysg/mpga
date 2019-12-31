import axios from 'axios';

import constants from '../constants';
import { EventDetail as Tournament } from '../models/Events';
import NotificationActions from './NotificationActions';

export enum TournamentActionTypes {
    GET_TOURNAMENTS_REQUESTED = "GET_TOURNAMENTS_REQUESTED",
    GET_TOURNAMENTS_SUCCEEDED = "GET_TOURNAMENTS_SUCCEEDED",
    GET_TOURNAMENTS_FAILED = "GET_TOURNAMENTS_FAILED",
};

const url = constants.ApiUrl + "/events/";

const TournamentActions = {
    Load: () => async (dispatch: any) => {
        dispatch({ type: TournamentActionTypes.GET_TOURNAMENTS_REQUESTED});
        try {
            const result = await axios.get(url + "?year=" + constants.EventCalendarYear.toString());
            const data = result.data.map((json: any) => new Tournament(json));
            dispatch({ type: TournamentActionTypes.GET_TOURNAMENTS_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: TournamentActionTypes.GET_TOURNAMENTS_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
}

export default TournamentActions;
