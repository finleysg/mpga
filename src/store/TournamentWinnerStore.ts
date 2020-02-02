import { Action, Reducer } from 'redux';

import { ITournamentWinnerGroup, TournamentWinner } from '../models/Events';
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
    payload: {
        winners: ITournamentWinnerGroup[];
    }
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

export interface ITournamentWinnerDeleteRequested extends Action {
    type: TournamentWinnerActionTypes.DELETE_TOURNAMENT_WINNER_REQUESTED;
}

export interface ITournamentWinnerDeleteSucceeded extends Action {
    type: TournamentWinnerActionTypes.DELETE_TOURNAMENT_WINNER_SUCCEEDED;
}

export interface ITournamentWinnerDeleteFailed extends Action {
    type: TournamentWinnerActionTypes.DELETE_TOURNAMENT_WINNER_FAILED;
}

export interface ITournamentWinnerAppendNew extends Action {
    type: TournamentWinnerActionTypes.APPEND_NEW_TOURNAMENT_WINNER;
    payload: { year: number, location: string }
}

export interface ITournamentWinnerCancelNew extends Action {
    type: TournamentWinnerActionTypes.CANCEL_NEW_TOURNAMENT_WINNER;
}

type KnownActions = ITournamentWinnersGetRequested | ITournamentWinnersGetSucceeded | ITournamentWinnersGetFailed
    | ITournamentWinnerSaveRequested | ITournamentWinnerSaveSucceeded | ITournamentWinnerSaveFailed
    | ITournamentWinnerDeleteRequested | ITournamentWinnerDeleteSucceeded | ITournamentWinnerDeleteFailed
    | ITournamentWinnerAppendNew | ITournamentWinnerCancelNew;

export const TournamentWinnersReducer: Reducer<ITournamentWinnerState, KnownActions> =
    (state: ITournamentWinnerState = defaultState, action: KnownActions): ITournamentWinnerState => {

    switch (action.type) {
        case TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_SUCCEEDED: {
            return {
                ...state, 
                isBusy: false, 
                winners: action.payload.winners,
            }
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
        case TournamentWinnerActionTypes.DELETE_TOURNAMENT_WINNER_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case TournamentWinnerActionTypes.DELETE_TOURNAMENT_WINNER_SUCCEEDED: {
            return {...state, isBusy: false};
        }
        case TournamentWinnerActionTypes.DELETE_TOURNAMENT_WINNER_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case TournamentWinnerActionTypes.APPEND_NEW_TOURNAMENT_WINNER: {
            const winner = new TournamentWinner({
                id: -1,
                year: action.payload.year,
                location: action.payload.location,
            });
            const winners = state.winners.slice(0);
            const group = winners
                .find(w => w.year === action.payload.year && 
                           w.location === action.payload.location);
            group?.winners.push(winner);
            return {...state, winners: winners }
        }
        case TournamentWinnerActionTypes.CANCEL_NEW_TOURNAMENT_WINNER: {
            return {...state};
        }
        default:
            return state;
    }
}
