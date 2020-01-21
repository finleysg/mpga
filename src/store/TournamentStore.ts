import { Action, Reducer } from 'redux';

import { Tournament } from '../models/Events';
import { TournamentActionTypes } from './TournamentActions';

export interface ITournamentState {
    tournament: Tournament;
    isBusy: boolean;
    hasError: boolean;
}

export const defaultState: ITournamentState = {
    tournament: new Tournament({}),
    isBusy: false,
    hasError: false,
};

export interface ITournamentsGetRequested extends Action {
    type: TournamentActionTypes.GET_TOURNAMENTS_REQUESTED;
}

export interface ITournamentsGetSucceeded extends Action {
    type: TournamentActionTypes.GET_TOURNAMENTS_SUCCEEDED;
    payload: Tournament;
}

export interface ITournamentsGetFailed extends Action {
    type: TournamentActionTypes.GET_TOURNAMENTS_FAILED;
}

export interface ITournamentSaveRequested extends Action {
    type: TournamentActionTypes.SAVE_TOURNAMENT_REQUESTED;
}

export interface ITournamentSaveSucceeded extends Action {
    type: TournamentActionTypes.SAVE_TOURNAMENT_SUCCEEDED;
}

export interface ITournamentSaveFailed extends Action {
    type: TournamentActionTypes.SAVE_TOURNAMENT_FAILED;
}

type KnownActions = ITournamentsGetRequested | ITournamentsGetSucceeded | ITournamentsGetFailed
    | ITournamentSaveRequested | ITournamentSaveSucceeded | ITournamentSaveFailed;

export const TournamentReducer: Reducer<ITournamentState, KnownActions> =
    (state: ITournamentState | undefined, action: KnownActions): ITournamentState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case TournamentActionTypes.GET_TOURNAMENTS_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case TournamentActionTypes.GET_TOURNAMENTS_SUCCEEDED: {
            return {...state, isBusy: false, tournament: action.payload }
        }
        case TournamentActionTypes.GET_TOURNAMENTS_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case TournamentActionTypes.SAVE_TOURNAMENT_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case TournamentActionTypes.SAVE_TOURNAMENT_SUCCEEDED: {
            return {...state, isBusy: false};
        }
        case TournamentActionTypes.SAVE_TOURNAMENT_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        default:
            return state;
    }
}
