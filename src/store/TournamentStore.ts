import { Action, Reducer } from 'redux';

import { Tournament } from '../models/Events';
import { TournamentActionTypes } from './TournamentActions';

export interface ITournamentState {
    tournaments: Tournament[];
    currentTournament: Tournament;
    isBusy: boolean;
    hasError: boolean;
}

export const defaultState: ITournamentState = {
    tournaments: [],
    currentTournament: new Tournament({}),
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

export interface ITournamentGetFailed extends Action {
    type: TournamentActionTypes.GET_TOURNAMENT_FAILED;
}

export interface ITournamentGetRequested extends Action {
    type: TournamentActionTypes.GET_TOURNAMENT_REQUESTED;
}

export interface ITournamentGetSucceeded extends Action {
    type: TournamentActionTypes.GET_TOURNAMENT_SUCCEEDED;
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
    | ITournamentGetRequested | ITournamentGetSucceeded | ITournamentGetFailed
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
            return {...state, isBusy: false, tournaments: action.payload }
        }
        case TournamentActionTypes.GET_TOURNAMENTS_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case TournamentActionTypes.GET_TOURNAMENT_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case TournamentActionTypes.GET_TOURNAMENT_SUCCEEDED: {
            return {...state, isBusy: false, currentTournament: action.payload }
        }
        case TournamentActionTypes.GET_TOURNAMENT_FAILED: {
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
