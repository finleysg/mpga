import { Action, Reducer } from 'redux';

import { EventDetail, Tournament, TournamentWinner } from '../models/Events';
import { TournamentActionTypes } from './TournamentActions';

export interface ITournamentState {
    events: EventDetail[];
    tournaments: Map<string, Tournament>;
    winners: TournamentWinner[];
    isBusy: boolean;
    hasError: boolean;
}

export const defaultState: ITournamentState = {
    events: [],
    tournaments: new Map([]),
    winners: [],
    isBusy: false,
    hasError: false,
};

export interface IEventsGetRequested extends Action {
    type: TournamentActionTypes.GET_EVENTS_REQUESTED;
}

export interface IEventsGetSucceeded extends Action {
    type: TournamentActionTypes.GET_EVENTS_SUCCEEDED;
    payload: EventDetail[];
}

export interface IEventsGetFailed extends Action {
    type: TournamentActionTypes.GET_EVENTS_FAILED;
}

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

export interface ITournamentWinnersGetRequested extends Action {
    type: TournamentActionTypes.GET_TOURNAMENT_WINNERS_REQUESTED;
}

export interface ITournamentWinnersGetSucceeded extends Action {
    type: TournamentActionTypes.GET_TOURNAMENT_WINNERS_SUCCEEDED;
    payload: TournamentWinner[];
}

export interface ITournamentWinnersGetFailed extends Action {
    type: TournamentActionTypes.GET_TOURNAMENT_WINNERS_FAILED;
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

export interface ITournamentWinnerSaveRequested extends Action {
    type: TournamentActionTypes.SAVE_TOURNAMENT_WINNER_REQUESTED;
}

export interface ITournamentWinnerSaveSucceeded extends Action {
    type: TournamentActionTypes.SAVE_TOURNAMENT_WINNER_SUCCEEDED;
}

export interface ITournamentWinnerSaveFailed extends Action {
    type: TournamentActionTypes.SAVE_TOURNAMENT_WINNER_FAILED;
}

type KnownActions = IEventsGetRequested | IEventsGetSucceeded | IEventsGetFailed
    | ITournamentsGetRequested | ITournamentsGetSucceeded | ITournamentsGetFailed
    | ITournamentWinnersGetRequested | ITournamentWinnersGetSucceeded | ITournamentWinnersGetFailed
    | ITournamentSaveRequested | ITournamentSaveSucceeded | ITournamentSaveFailed
    | ITournamentWinnerSaveRequested | ITournamentWinnerSaveSucceeded | ITournamentWinnerSaveFailed;

export const TournamentsReducer: Reducer<ITournamentState, KnownActions> =
    (state: ITournamentState | undefined, action: KnownActions): ITournamentState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case TournamentActionTypes.GET_EVENTS_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case TournamentActionTypes.GET_EVENTS_SUCCEEDED: {
            return {...state, events: action.payload, isBusy: false};
        }
        case TournamentActionTypes.GET_EVENTS_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case TournamentActionTypes.GET_TOURNAMENTS_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case TournamentActionTypes.GET_TOURNAMENTS_SUCCEEDED: {
            const tournaments = new Map();
            action.payload.forEach((t: Tournament) => {
                tournaments.set(t.systemName, t);
            });
            return {...state, tournaments: tournaments }

        }
        case TournamentActionTypes.GET_TOURNAMENTS_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case TournamentActionTypes.GET_TOURNAMENT_WINNERS_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case TournamentActionTypes.GET_TOURNAMENT_WINNERS_SUCCEEDED: {
            return {...state, winners: action.payload }
        }
        case TournamentActionTypes.GET_TOURNAMENT_WINNERS_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case TournamentActionTypes.SAVE_TOURNAMENT_WINNER_REQUESTED:
        case TournamentActionTypes.SAVE_TOURNAMENT_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case TournamentActionTypes.SAVE_TOURNAMENT_WINNER_SUCCEEDED:
        case TournamentActionTypes.SAVE_TOURNAMENT_SUCCEEDED: {
            return {...state, isBusy: false};
        }
        case TournamentActionTypes.SAVE_TOURNAMENT_WINNER_FAILED:
        case TournamentActionTypes.SAVE_TOURNAMENT_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        default:
            return state;
    }
}
