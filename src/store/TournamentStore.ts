import { Action, Reducer } from 'redux';

import { EventDetail as Tournament } from '../models/Events';
import { TournamentActionTypes } from './TournamentActions';

export interface ITournamentState {
    data: Tournament[];
    isBusy: boolean;
    hasError: boolean;
}

export const defaultState: ITournamentState = {
    data: [],
    isBusy: false,
    hasError: false,
};

export interface ITournamentsGetRequested extends Action {
    type: TournamentActionTypes.GET_TOURNAMENTS_REQUESTED;
}

export interface ITournamentsGetSucceeded extends Action {
    type: TournamentActionTypes.GET_TOURNAMENTS_SUCCEEDED;
    payload: Tournament[];
}

export interface ITournamentsGetFailed extends Action {
    type: TournamentActionTypes.GET_TOURNAMENTS_FAILED;
}

type KnownActions = ITournamentsGetRequested 
    | ITournamentsGetSucceeded 
    | ITournamentsGetFailed;

export const TournamentsReducer: Reducer<ITournamentState, KnownActions> =
    (state: ITournamentState | undefined, action: KnownActions): ITournamentState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case TournamentActionTypes.GET_TOURNAMENTS_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case TournamentActionTypes.GET_TOURNAMENTS_SUCCEEDED: {
            return {...state, data: action.payload, isBusy: false};
        }
        case TournamentActionTypes.GET_TOURNAMENTS_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        default:
            return state;
    }
}
