import { Action, Reducer } from 'redux';

import { ITournamentWinnerGroup } from '../models/Events';
import { TournamentWinnerActionTypes } from './TournamentWinnerActions';

export interface ITournamentWinnerState {
    winners: ITournamentWinnerGroup[];
    isBusy: boolean;
    hasError: boolean;
}

export const defaultState: ITournamentWinnerState = {
    winners: [],
    isBusy: false,
    hasError: false,
};

export interface ITournamentWinnersGetRequested extends Action {
    type: TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_REQUESTED;
}

export interface ITournamentWinnersGetSucceeded extends Action {
    type: TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_SUCCEEDED;
    payload: ITournamentWinnerGroup[];
}

export interface ITournamentWinnersGetFailed extends Action {
    type: TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_FAILED;
}
export interface ITournamentWinnerSaveRequested extends Action {
    type: TournamentWinnerActionTypes.SAVE_TOURNAMENT_WINNER_REQUESTED;
}

export interface ITournamentWinnerSaveSucceeded extends Action {
    type: TournamentWinnerActionTypes.SAVE_TOURNAMENT_WINNER_SUCCEEDED;
}

export interface ITournamentWinnerSaveFailed extends Action {
    type: TournamentWinnerActionTypes.SAVE_TOURNAMENT_WINNER_FAILED;
}

type KnownActions = ITournamentWinnersGetRequested | ITournamentWinnersGetSucceeded | ITournamentWinnersGetFailed
    | ITournamentWinnerSaveRequested | ITournamentWinnerSaveSucceeded | ITournamentWinnerSaveFailed;

export const TournamentWinnersReducer: Reducer<ITournamentWinnerState, KnownActions> =
    (state: ITournamentWinnerState = defaultState, action: KnownActions): ITournamentWinnerState => {

    switch (action.type) {
        case TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_SUCCEEDED: {
            return {...state, isBusy: false, winners: action.payload }
        }
        case TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case TournamentWinnerActionTypes.SAVE_TOURNAMENT_WINNER_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case TournamentWinnerActionTypes.SAVE_TOURNAMENT_WINNER_SUCCEEDED: {
            return {...state, isBusy: false};
        }
        case TournamentWinnerActionTypes.SAVE_TOURNAMENT_WINNER_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        default:
            return state;
    }
}
