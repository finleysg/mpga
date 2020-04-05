import { Action, Reducer } from 'redux';

import { Tournament } from '../models/Events';
import { TournamentActionTypes } from './TournamentActions';

export interface ITournamentState {
    tournaments: Tournament[];
    currentTournament: Tournament;
}

export const defaultState: ITournamentState = {
    tournaments: [],
    currentTournament: new Tournament({}),
};

export interface ITournamentsGetSucceeded extends Action {
    type: TournamentActionTypes.GET_TOURNAMENTS_SUCCEEDED;
    payload: Tournament[];
}

export interface ITournamentGetSucceeded extends Action {
    type: TournamentActionTypes.GET_TOURNAMENT_SUCCEEDED;
    payload: Tournament;
}

type KnownActions = ITournamentsGetSucceeded | ITournamentGetSucceeded;

export const TournamentReducer: Reducer<ITournamentState, KnownActions> =
    (state: ITournamentState | undefined, action: KnownActions): ITournamentState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case TournamentActionTypes.GET_TOURNAMENTS_SUCCEEDED: {
            return {...state, tournaments: action.payload }
        }
        case TournamentActionTypes.GET_TOURNAMENT_SUCCEEDED: {
            return {...state, currentTournament: action.payload }
        }
        default:
            return state;
    }
}
